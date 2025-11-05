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
  console.log(feedData);
  

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
    if(!feedData){
      getFeed();
    }
    
  },[])
   
      
  return (
    <>
    <div className='flex flex-col items-center justify-center my-4 '>
        {feedData && feedData.map((feedItem)=>{
          return <div className='my-2 '> <UserCard feedData={feedItem} /> </div>
        })}
    </div>
    </>
  )
}

export default Feed
