import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

function Login() {

    const [emailId,setEmailId] = useState("simran@gmail.com");
    const [password, setPassword]= useState("Simran@123");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async ()=>{
     try{
    const res = await axios.post(BASE_URL+ "/login",{
        emailId,
        password
      },{ withCredentials: true })
      dispatch(addUser(res.data))
      navigate("/");
      
     }catch(err){
      console.error(err.message);
      
     }
    }

  return (
    <div className='flex justify-center my-10'>
     <div className="card bg-blue-900/50 backdrop-blur-md w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center text-white font-bold">Login</h2>

    <div className=''>

   <div className='my-2'>
   <label className="form-control w-full max-w-xs ">
  <div className="label ">
    <span className="label-text text-white font-bold">Email ID </span>
  </div>
  <input type="text" className="input input-bordered w-full max-w-xs" value={emailId} onChange={(e)=>setEmailId(e.target.value)} />
</label>
   </div>

<div className='my-2'>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-white font-bold">Password</span>
  </div>
  <input type="text" className="input input-bordered w-full max-w-xs" value={password} onChange={(e)=>setPassword(e.target.value)} />
</label>
</div>

    </div>

    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary bg-base-300 border-0" onClick={handleLogin}>login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
