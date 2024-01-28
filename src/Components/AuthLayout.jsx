/* eslint-disable react/prop-types */
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.authReducer.status)
    // console.log(authStatus);
    // console.log(authentication);
    const [loader, setloader] = useState(true)

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setloader(false)
    },[navigate, authStatus, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}