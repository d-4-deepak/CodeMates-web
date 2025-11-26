import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { addConnections } from '../utils/connectionSlice';
import ConnectionCard from './ConnectionCard';

const Connection = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store=>store.connections);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState("");

    const getConnections = async ()=>{
       setLoading(true)
       setFetchError("")
        try{
            const res = await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
            dispatch(addConnections(res?.data?.data));
            

        }catch(err){
            console.error(err.message);
            
      setFetchError("Could not load connections. Please try again.");
            
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
   
        getConnections();
      
    },[])

    
  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <span className="inline-flex items-center p-2 px-4 bg-base-300 rounded font-bold">
          Loading...
        </span>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex justify-center my-8">
        <span className="inline-flex items-center p-2 px-4 bg-red-100 text-red-700 rounded font-bold">
          {fetchError}
        </span>
      </div>
    );
  }

    if(!connections) return;
    if(connections.length==0){
        return  <div className="flex justify-center my-4">
        <h1 className="inline-flex p-2 px-4 font-bold text-xl bg-base-300 rounded">
          No Connections Found!
        </h1>
      </div>
    }
    
  return (
    <div className='flex flex-col items-center '>
      <h1 className='font-bold text-2xl m-auto'>Connection</h1>

        {
          connections && connections.map((connection)=>{
                return(
                    <ConnectionCard connection={connection} />
    //                 <div className="flex items-center  bg-base-300 m-1 min-w-[330px] w-1/2 p-3">
    //         <div>  
    //             <img src={photoUrl} alt='image' className='h-16 w-16 rounded-full '/>
    //             </div>                  
    //  <div className='px-4  '>

    //     <div className='font-bold text-xl'>{firstName+" "+lastName}</div>
                        
    //                     {(age || gender) &&<div className="flex gap-2">
    //     {age &&<span><span className='font-bold'>Age: </span><span>{age} </span></span>}
    //     {gender &&<span><span className='font-bold'>Gender: </span><span>{gender} </span></span>}
    // </div>}
    //                     {/* <p>{about}</p> */}
    //                   { skills.length!=0 && <p><span className='font-bold'>Skills: </span>{skills.map((skill)=>skill+", ")}</p>}
    //                     </div>
    //                 </div>

                )
            })
        }


    </div>
  )
}

export default Connection
