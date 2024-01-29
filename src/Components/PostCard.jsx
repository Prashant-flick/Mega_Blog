/* eslint-disable react/prop-types */
import React from 'react'
import appwriteService from '../appwrite/config'
import {Link, useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostCard({
  $id,
  featuredImage,
  title
}) {
  if(!featuredImage){
    const [post, setPost] = React.useState(null)
    const navigate = useNavigate()
    const posts = useSelector((state) => state.dataReducer.data)
    const slug = useParams()
    if(slug){
      if(posts && posts.length > 0){
        posts.map((post) => {
          if(post.title === slug){
            setPost(post)
          }
        })
      }else{
        appwriteService.getPost(slug)
        .then((post) => {
          if(post){
            setPost(post)
          }else{
            navigate("/")
          }
        })
      }
      featuredImage=post.featuredImage;
      if(!featuredImage){
        navigate("/")
      }
    }
  }
  

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img
            className='rounded-xl'
            src={appwriteService.getFilePreview(featuredImage)} alt={title} />
        </div>
        <h2
          className='text-xl font-bold'
        >{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard