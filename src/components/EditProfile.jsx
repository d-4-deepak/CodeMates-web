import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
    const {firstName,lastName,emailId,age,gender,skills,about,photoUrl} = user;
    
       const [newFirstName,setNewFirstName] = useState(firstName);
        const [newLastName, setNewLastName]= useState(lastName);
        const [newPhotoUrl, setNewPhotoUrl]= useState(photoUrl);
        const [newEmailId, setNewEmailId]= useState(emailId);
        const [newAge, setNewAge]= useState(age||"");
        const [newGender, setNewGender]= useState(gender);
        const [newSkills, setNewSkills]= useState(skills.map((skill)=>skill));
        const [inputSkill,setInputSkill] = useState("");
        const [newAbout, setNewAbout]= useState(about);
        const [showToast,setShowToast] = useState(false);
        const [error, setError] = useState();

        const dispatch = useDispatch();

        const saveProfile =async ()=>{
            if(!newFirstName){
              return setError("First Name is required")

            }
            try{
                const res = await axios.patch(BASE_URL+"/profile/edit",{firstName:newFirstName,lastName:newLastName,photoUrl:newPhotoUrl,age:newAge,gender:newGender,about:newAbout,skills:newSkills},{withCredentials:true});
                console.log(res);
                dispatch(addUser(res?.data?.data));
                setError("");
                setShowToast(true);
                setTimeout(()=>{
                    setShowToast(false);
                },3000)
            }catch(err){
                setError(err.response.data);
            }
        }

        const handleSkill = (e)=>{
            if(e.key==="Enter" && inputSkill.trim()!=""){
                setNewSkills([...newSkills,inputSkill.trim()]);
                setInputSkill("");
            }
        }
  return (
   <>
    <div className='flex flex-wrap my-10 justify-center '>
         <div className='flex justify-center mx-10 mb-10 '>
     <div className="card bg-[#15191E]  w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center text-white font-bold">Edit Profile</h2>

    <div className=''>

   <div className='my-2'>
   <label className="form-control w-full max-w-xs ">
  <div className="label ">
    <span className="label-text text-white font-bold">First Name </span>
  </div>
  <input type="text" className="input input-bordered w-full max-w-xs bg-[#38476F] text-white" value={newFirstName} onChange={(e)=>setNewFirstName(e.target.value)} />
</label>
   </div>

<div className='my-2'>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-white font-bold">Last Name</span>
  </div>
  <input type="text" className="input input-bordered w-full max-w-xs bg-[#38476F] text-white" value={newLastName} onChange={(e)=>setNewLastName(e.target.value)} />
</label>
</div>


<div className='my-2'>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-white font-bold">Email ID</span>
  </div>
  <input type="emailId" className="input input-bordered w-full max-w-xs bg-[#38476F] text-white"  readOnly value={newEmailId} />
</label>
</div>

<div className='my-2'>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-white font-bold">photo Url</span>
  </div>
  <input type="text" className="input input-bordered w-full max-w-xs bg-[#38476F] text-white" value={newPhotoUrl} onChange={(e)=>setNewPhotoUrl(e.target.value)} />
</label>
</div>


<div className='my-2'>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-white font-bold">Age</span>
  </div>
  <input type="number" className="input input-bordered w-full max-w-xs bg-[#38476F] text-white" value={newAge} onChange={(e)=>setNewAge(e.target.value)} />
</label>
</div>

<div className="my-2">
  <label className="form-control w-full max-w-xs">
    <div className="label">
      <span className="label-text text-white font-bold">Gender</span>
    </div>

    <div className="flex  gap-2 text-white">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="gender"
          value="male"
          checked={newGender === "male"}
          onChange={(e) => setNewGender(e.target.value)}
          className="radio radio-primary"
        />
        Male
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="gender"
          value="female"
          checked={newGender === "female"}
          onChange={(e) => setNewGender(e.target.value)}
          className="radio radio-primary"
        />
        Female
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="gender"
          value="other"
          checked={newGender === "other"}
          onChange={(e) => setNewGender(e.target.value)}
          className="radio radio-primary"
        />
        Other
      </label>
    </div>
  </label>
</div>


<div className='my-2'>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-white font-bold">About</span>
  </div>
  <textarea  className="textarea textarea-bordered w-full max-w-xs bg-[#38476F] text-white" value={newAbout} onChange={(e)=>{
       if(e.target.value.length<=200){
        setNewAbout((e.target.value))
        setError("")
    }else{
        setError("text Limit exceeds")
    }
  }} />
</label>
</div>

<div className='my-2'>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-white font-bold">Skills</span>
  </div>
  <input type="text" className="input input-bordered w-full max-w-xs bg-[#38476F] text-white" value={inputSkill} onChange={(e)=>setInputSkill(e.target.value)} onKeyDown={handleSkill} />
</label>

<div className="m-2 flex flex-wrap">
  {newSkills.map((skill, index) => (
    <div
      key={index}
      className="relative inline-flex items-center bg-[#38476F] m-2 py-1 px-4 border rounded-xl shadow-sm"
    >
      <span className="text-sm font-medium text-white">{skill}</span>

      {/* ❌ Remove button */}
      <button
        type="button"
        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] hover:bg-red-600 transition"
        onClick={() => setNewSkills(newSkills.filter((_,i)=>i!=index))}
      >
        ✕ 
      </button>
    </div>
  ))}
</div>

</div>


    </div>

    {error && <p className='text-red-600 font-bold '>{error}</p>}

    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary bg-base-300 border-0 bg-[#38476F]" onClick={saveProfile} >Save</button>
    </div>
  </div>
</div>
    </div>
   <div className='flex flex-col items-center'>
   <UserCard feedData={{firstName:newFirstName,lastName:newLastName,photoUrl:newPhotoUrl,age:newAge,gender:newGender,about:newAbout,skills:newSkills}} title={"Profile Preview"}/>
   </div>
    </div>
   {showToast&& <div className='flex fixed justify-center absolute top-[10px] left-[50%] transform -translate-x-1/2'>
    <p className='bg-pink-600 font-bold min-w-[250px] inline-block px-4 py-2 rounded-lg '>✅ Profile saved successfully</p>
    </div>}
    {/* <div className="toast toast-top toast-center">
  <div className="alert alert-info">
    <span>New mail arrived.</span>
  </div>
  <div className="alert alert-success">
    <span>Message sent successfully.</span>
  </div>
</div> */}
    </>
  )
}

export default EditProfile
