import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

function Login() {

    const [emailId,setEmailId] = useState("");
    const [password, setPassword]= useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [isLogin,setIsLogin] = useState(true);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUp = async ()=>{

      try{
        const res = await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials:true});
        
        dispatch(addUser(res.data.data));
        navigate("/profile");
      }catch(err){
        if(err.response){
          // server responded but with an error (e.g., 400, 401)
    setError(err.response.data || "Something went wrong");
      }else if(err.request){
        // request made but no response (server offline or not reachable)
    setError("Server is not reachable. Please try again later.");
      }else{
        setError("An unexpected error occurred.");
      }
      }
    }

    const handleLogin = async ()=>{
      setError("")
     try{
    const res = await axios.post(BASE_URL+ "/login",{
        emailId,
        password
      },{ withCredentials: true })
      dispatch(addUser(res.data))
      navigate("/");
      
     }catch(err){
      
      if(err.response){
          // server responded but with an error (e.g., 400, 401)
    setError(err.response.data || "Something went wrong");
      }else if(err.request){
        // request made but no response (server offline or not reachable)
    setError("Server is not reachable. Please try again later.");
      }else{
        setError("An unexpected error occurred.");
      }
      
     }
    }

  return (
    <div className='flex justify-center m-auto my-10 w-2/3 '>
     <div className="card bg-blue-900/50 backdrop-blur-md w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center text-white font-bold">Login</h2>

    <div className=''>

 { !isLogin && <> <div className='my-2'>
   <label className="form-control w-full max-w-xs ">
  <div className="label ">
    <span className="label-text text-white font-bold">First Name </span>
  </div>
  <input type="text" className="input input-bordered w-full max-w-xs text-white bg-[#38476F]" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
</label>
   </div>

   <div className='my-2'>
   <label className="form-control w-full max-w-xs ">
  <div className="label ">
    <span className="label-text text-white  font-bold">Last Name </span>
  </div>
  <input type="text" className="input input-bordered w-full max-w-xs text-white bg-[#38476F]" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
</label>
   </div> </>}

   <div className='my-2'>
   <label className="form-control w-full max-w-xs ">
  <div className="label ">
    <span className="label-text text-white font-bold">Email ID </span>
  </div>
  <input type="text" className="input input-bordered w-full max-w-xs text-white bg-[#38476F]" value={emailId} onChange={(e)=>setEmailId(e.target.value)} />
</label>
   </div>

<div className='my-2'>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-white font-bold">Password</span>
  </div>
  <input type="password" className="input input-bordered w-full max-w-xs text-white bg-[#38476F]" value={password} onChange={(e)=>setPassword(e.target.value)} />
</label>
</div>

    </div>

    {error && <p className='text-red-600 font-bold '>{error}</p>}

    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary bg-[#15191E] border-0" onClick={isLogin? handleLogin : handleSignUp}>{isLogin?"Login":"Sign up"}</button>
    </div>
    <p className='m-auto font-bold text-white cursor-pointer' onClick={()=>setIsLogin((value)=>!value)}>{isLogin?"New User? SignUp":"Already Registered? Login"}</p>
  </div>
</div>
    </div>
  )
}

export default Login
