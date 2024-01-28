import React, {useState} from 'react'
import appwriteService from '../appwrite/config'
import {Container, PostCard} from '../Components/index'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const user = useSelector((state) => state.authReducer.userData)
    const data = useSelector((state) => state.dataReducer.data)
    // console.log(user);
    // console.log(data);  

    React.useEffect(() => {
        if(user){
            // console.log(data);
            if(data && data.length !== 0){
                // console.log(data);
                setPosts(data)
            }else{
                // console.log("here");
                appwriteService.getPosts()
                .then((posts) => {
                    console.log(posts.documents);
                    if(posts){
                        setPosts(posts.documents)
                    }
                })
            }
        }else{
            setPosts([])
        }
    },[user])


  if(posts.length === 0){
    return (
        <div className='w-full py-8 mt-4 text-center'>
            <Container>
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold hover:text-gray-500'>Login to read Posts</h1>
                        {/* {navigate('/login')} */}
                    </div>
                </div>
                
            </Container>
        </div>
    )
  }

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts && posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'> 
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Home