import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async ()=>{
    try{
    const res = await axios.get(BASE_URL+"/profile/view",{withCredentials:true});
    dispatch(addUser(res.data));
    }catch(err){
      if(err.status === 401){
        navigate("/login")
      }
      console.error(err.message);
    }
  }

  useEffect(()=>{
    
    fetchUser();
    
  },[])

  return (
    <div  className="  min-h-screen flex flex-col bg-fixed bg-cover bg-no-repeat  bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1950&q=80')]  bg-cover bg-center">
      <NavBar/>
      <main className='flex-grow'>
      <Outlet/>
      </main>
      <Footer />
    </div>
  )
}

export default Body
