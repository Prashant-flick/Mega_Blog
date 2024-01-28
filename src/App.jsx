/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react'
import {login, logout} from './store/authSlice'
import  authservice   from './appwrite/auth'
import {useDispatch, useSelector} from 'react-redux'
import {Header , Footer} from './Components/index'
import { Outlet } from 'react-router-dom'
import { getItem } from './store/databaseSlice.js'
import { getauth} from './store/authSlice.js'

function App() {
    const [loading, setloading] = useState(true)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.userData)
    // console.log(user);

    useEffect(()=>{
      // console.log("here");
      const auth = JSON.parse(localStorage.getItem("auth"))
      const data = JSON.parse(localStorage.getItem("data"))
      if(data)dispatch(getItem(data))
      if(auth)dispatch(getauth(auth))
    })

    useEffect(()=>{
      if(user){
        authservice.getCurrentUser()
        .then((userdata) => {
          if(userdata){
            dispatch(login({userdata}))
          }else{
            dispatch(logout())
          }
        })
        .catch((error) => {
          throw error
        })
        .finally(() => setloading(false))
      }else{
        setloading(false)
      } 
    },[])    

  return !loading ? (
    <div className='min-h-screen bg-gray-400'>
      <div className='w-full flex flex-col p-8 items-center content-center'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null;
}

export default App