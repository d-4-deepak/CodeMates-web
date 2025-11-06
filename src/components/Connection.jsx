import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { addConnections } from '../utils/connectionSlice';

const Connection = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store=>store.connections);
    const getConnections = async ()=>{
       
        try{
            const res = await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
            console.log(res.data.data);
            dispatch(addConnections(res?.data?.data));
            

        }catch(err){
            console.error(err.message);
            
        }
    }
    useEffect(()=>{
        getConnections();
    },[])
    if(!connections) return;
    if(connections.length==0){
        return <h1>No connections</h1>
    }
    
  return (
    <div className='flex flex-col items-center '>
      <h1 className='font-bold text-2xl'>Connection</h1>

        {
          connections && connections.map((connection)=>{
                const {firstName,lastName,age,photoUrl,gender,about,skills} = connection;
                return(
                    <div className="flex items-center  bg-base-300 m-1 min-w-[330px] w-1/2 p-3">
            <div>  
                <img src={photoUrl} alt='image' className='h-16 w-16 rounded-full '/>
                </div>                  
     <div className='px-4  '>

        <div className='font-bold text-xl'>{firstName+" "+lastName}</div>
                        
                        {(age || gender) &&<div className="flex gap-2">
        {age &&<span><span className='font-bold'>Age: </span><span>{age} </span></span>}
        {gender &&<span><span className='font-bold'>Gender: </span><span>{gender} </span></span>}
    </div>}
                        {/* <p>{about}</p> */}
                      { skills.length!=0 && <p><span className='font-bold'>Skills: </span>{skills.map((skill)=>skill+", ")}</p>}
                        </div>
                    </div>

                )
            })
        }


    </div>
  )
}

export default Connection
