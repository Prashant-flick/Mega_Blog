/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import authservice from '../appwrite/auth'
import {login as authLogin} from '../store/authSlice'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import {Button, Input, Logo} from './index'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm()
  const [error, seterror] = useState("")

  const login = async(data) => {
    // console.log(data);
    seterror("")
    try {
      const session = await authservice.login(data)
      // console.log(session);

      if(session){
        const userdata = await authservice.getCurrentUser()
        console.log(userdata);
        if(userdata) {
          dispatch(authLogin(userdata))
          // console.log("hello")
        }
        navigate('/')
      }else{
        authservice.logout()
      }
    } catch (error) {
      seterror(error.message)
    }
  }

  return (
    <div
      className='flex items-center justify-center w-full'
    >
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' />
          </span>
        </div>
        <h2 className='text-center text-2xl text-gray-800 font-bold leading-tight'>
          sign in to yout account
        </h2>
        <p className='mt-2 text-center text-base text-black/60'> 
          Don&apos;t have any account?&nbsp;
          <Link
            to='/signup'
            className='font-medium text-primary transition-all duration-200 hover:underline'
          >
            Sign up
          </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>
            {error}
        </p>}
        <form onSubmit={handleSubmit(login )}
          className='mt-8'
        >
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
              }
            })}
          />
          <Input
            label="Password: "
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true
            })}
          />
          <Button 
            type="submit"
            className='w-full'  
          >Sign In</Button>          

        </form>
      </div>
    </div>
  )
}

export default Login