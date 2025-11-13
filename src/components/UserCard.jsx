import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeFromFeed } from '../utils/feedSlice';

const UserCard = ({feedData,title}) => {
    const {_id,photoUrl, firstName, lastName,skills,about,age,gender} = feedData;
    const dispatch = useDispatch();
    const handleSendRqeuest = async (status,userId)=>{
      try{
        const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
        dispatch(removeFromFeed(userId));
      }catch(err){
        console.error(err.message);
        
      }
    }
    
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
          { title&&<p className=' flex item-center justify-center font-bold text-white mt-4'>{title}</p>}
        
  <figure className='my-4'>
    <img
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body m-4">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
   {(age || gender) &&<div className="flex gap-2">
        {age &&<span><span className='font-bold'>Age: </span><span>{age} </span></span>}
        {gender &&<span><span className='font-bold'>Gender: </span><span>{gender} </span></span>}
    </div>}
    <p><span className='font-bold'>About: </span> {about}</p>
{   skills && <p><span className='font-bold'>Skills: </span> {skills.map((skill)=>skill+", ")}</p>
}    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={()=>handleSendRqeuest("ignored",_id)}>Ignore</button>
      <button className="btn btn-primary bg-pink-600 border-0" onClick={()=>handleSendRqeuest("interested",_id)}>Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard