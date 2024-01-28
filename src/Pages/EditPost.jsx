import React,{useState} from 'react'
import {Container, PostForm} from '../Components/index'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

function EditPost() {
    // console.log("hello");
    const [post, setPost] = useState(null)
    const allpost = useSelector((state) => state.dataReducer.data)
    const navigate = useNavigate()
    const {slug} = useParams()
    // console.log(post);
    React.useEffect(() => {
        if(slug){
            console.log(slug);
            if(allpost){
                // console.log(allpost);
                allpost.map((post) => post.title === slug ? setPost(post) : null)
                // console.log(post);
            }else{
                appwriteService.getPost(slug)
                .then((post) => {
                    if(post){
                        setPost(post)
                    }
                })
                .catch((error) => console.log(error))
            }
        }else{
            navigate('/')
        }
    },[slug])


  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost