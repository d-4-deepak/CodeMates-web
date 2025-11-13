import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Login from './Login';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store)=>store.feed);

  
  

  const getFeed = async ()=>{
   
    try{
      const res = await   axios.get(BASE_URL+"/feed",{withCredentials:true});
      // console.log(res.data);
      dispatch(addFeed(res.data));
      
    }catch(err){
      console.error(err);
      
    }
  }

  useEffect(()=>{
    if(!feedData || feedData.length === 0){
      getFeed();
    }
  }, [feedData])
   
  if (!feedData) {
    return <h1>Loading...</h1>;
  }
  
  if (feedData.length === 0) {
    return <h1>No new User!</h1>;
  }
  return (
    <>
    <div className='flex flex-col items-center justify-center my-4 '>
       
        {feedData && <div  className='my-2'> <UserCard feedData={feedData[0]} /> </div>
      }
    </div>
    </>
  )
}

export default Feed