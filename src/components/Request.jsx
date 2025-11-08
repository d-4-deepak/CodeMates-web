import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requestSlice'
import ConnectionCard from './connectionCard'

const Request =   () => {
    const dispatch = useDispatch();
    const requests = useSelector(store=>store.requests);
    const getRequests = async ()=>{
        try{
            const res =  await axios.get(BASE_URL+"/user/requests/received", {withCredentials:true});
         
            dispatch(addRequests(res.data.data))
            
        }catch(err){
            console.error(err.message);
            
        }
 }

    useEffect(()=>{
     
        getRequests();
       
    },[])

if(!requests) return
if(requests.length==0){
    return   <div className="flex justify-center my-4">
    <h1 className="inline-flex p-2 px-4 font-bold text-xl bg-base-300 rounded">
      No requests Found!
    </h1>
  </div>
}
     
  return (
    <div className='flex flex-col items-center '>
    <h1 className='font-bold text-2xl'>Connection</h1>

      {
        requests && requests.map((request)=>{
              return(
                  <ConnectionCard connection={request.fromUserId} request={true} _id={request._id} />
              )
          })
      }


  </div>
  )
}

export default Request
