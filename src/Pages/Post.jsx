import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../Components/index";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../store/databaseSlice";

export default function Post() {
    const [post, setPost] = useState(null);
    const posts = useSelector((state) => state.dataReducer.data)
    const { slug } = useParams();
    const navigate = useNavigate();
    console.log(post);
    // console.log(post.featuredImage);
    // console.log(slug);

    const userData = useSelector((state) => state.authReducer.userData);
    // console.log(userData);

    const isAuthor = post && userData ? post.userid === userData.$id : false;
    // console.log(isAuthor);
    const dispatch = useDispatch()

    useEffect(() => {
        if (slug) {
            if(posts && posts.length > 0){
                console.log(posts);
                posts.map((post) => {
                    if(post.title === slug){
                        setPost(post)
                    }
                })
                if(posts==null){
                    navigate("/")
                }
            }else{
                console.log(posts);
                appwriteService.getPost(slug)
                .then((post) => {
                    // console.log(post);
                    if (post){
                        setPost(post);
                    }else{
                        navigate("/")
                    } 
                });
            }
            
        } else {
            navigate("/");
        }
    }, [slug]);

    const deletePost = () => {
        dispatch(remove(post.$id))
        appwriteService.deleteDatabse(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    console.log(post);
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}