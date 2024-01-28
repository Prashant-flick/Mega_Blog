import React,{useState} from 'react'
import {PostCard, Container } from '../Components/index'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const post = useSelector((state) => state.dataRecuder.data)

    React.useEffect(() => {
        if(post){
            setPosts(post)
        }else{
            appwriteService.getPosts([])
            .then((post) => {
                if(post){
                    // console.log(post)
                    setPosts(post.documents)
                }
            })
            .catch((error) => console.log(error))
        }
    },[])
    // console.log(posts);
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts && posts.map((post) => (
                    <div key={post.$id}  className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts