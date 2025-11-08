import React from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../utils/requestSlice';

const ConnectionCard = ({connection,request,_id}) => {
    const {firstName,lastName,age,photoUrl,gender,about,skills} = connection;
    const dispatch = useDispatch();
    const reviewRequest = async (status,id)=>{
      console.log(id);
    try{
      const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+id,{},{withCredentials:true});
      
      
      dispatch(removeRequest(id));
    }catch(err){
      console.error(err.message);
      
    }      
    }
    

  return (
    
         <div className="flex items-center sm:justify-between  bg-base-300 m-1 min-w-[330px]  lg:w-1/2 sm:w-2/3  p-3">

    <div className='flex items-center '>
          {/* Image div */}
            <div>  
                <img src={photoUrl} alt='image' className="aspect-square w-16 sm:w-26 md:w-20 rounded-full object-cover object-center border-2 border-white shadow-sm flex-shrink-0"
                />
            </div>  

            {/* meta Deta Div                 */}
     <div className='px-2 '>

        <div className='font-bold text-[12px] sm:text-xl'>{firstName+" "+lastName}</div>
                        
        {
            (age || gender) && <div className={`flex gap-2 ${request?"sm:block hidden":""}`}>
          {age &&<span className=''>
                    <span className='font-bold sm:text-[16px] text-[12px]'>Age: </span>
                    <span className='sm:text-[16] text-[12px]'>{age} </span>
                </span>}
          {gender &&<span><span className='font-bold sm:text-[16] text-[12px]'>Gender: </span><span className='sm:text-[16] text-[12px]'>{gender} </span></span>}
    </div>
    }
                        {/* <p>{about}</p> */}
                      { skills.length!=0 && <p className={request?"sm:block hidden":""}>
                        <span className='font-bold sm:text-[16px] text-[12px]'>Skills: </span>
                        <span className='sm:text-[16px] text-[12px]' >{skills.map((skill)=>skill+", ")}</span>
                      </p>}
     </div>
     </div>
                        
                        {/* Button div */}
                       {request && <div className='flex  '>
                        <button className="btn btn-primary mx-1 px-2 py-1 text-[12px] text-sm sm:px-4 sm:py-2 sm:text-base" onClick={()=>reviewRequest("rejected",_id)}>Reject</button>
                        <button className="btn btn-primary bg-pink-600 text-[12px] text-sm sm:px-4 sm:py-2 sm:text-base border-0" onClick={()=>reviewRequest("accepted",_id)}>Accept</button>
                        </div>}
                    </div>

   
  )
}

export default ConnectionCard
