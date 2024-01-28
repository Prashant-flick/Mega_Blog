/* eslint-disable react/prop-types */
import React, {useCallback} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { add, update } from '../../store/databaseSlice'

function PostForm({post}) {
    const navigate = useNavigate()
    const userdata = useSelector((state) => state.authReducer.userData)
    // console.log(userdata);
    const dispatch = useDispatch()
    const {register, watch, handleSubmit, setValue , control, getValues} = useForm({
        defaultValues: {
            title : post?.title || '',
            slug : post?.slug || '',
            content : post?.content || '',
            status : post?.status || 'active',
        }
    })

    // console.log(post);

    const submit = async(data) => {
        // console.log(data);
        // console.log(post);
        if(post){
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            if(file){
                await appwriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteService.updateDatabase(
                post.$id,
                {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                }
            )
                
            if(dbPost){
                console.log(dbPost);
                dispatch(update(dbPost))
                navigate(`/post/${dbPost.$id}`)
            }
        }else{
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            // console.log("file ",file);
            // console.log(userdata);
            if(file){
                // console.log(data.featuredImage);
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.createDatabase({
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                    userid: userdata.$id,
                }
                )
                if(dbPost){
                    // console.log(dbPost);
                    dispatch(add(dbPost))
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }   
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof(value) === 'string'){
            const slug = value.toLowerCase().replace(/ /g,'-')
            return slug

            // return value
            //     .trim()
            //     .toLowerCase()
            //     .replace(/^[a-zA-z/\d]/g, '-')
        }

        return ''
    },[])

    React.useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === 'title'){
                setValue('slug', slugTransform(value.title,
                    {shouldValidate: true}    
                ))  
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    },[setValue, slugTransform, watch])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  )
}

export default PostForm