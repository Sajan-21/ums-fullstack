import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPasswordEmployee() {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      if(newPassword !== confirmPassword){
        alert("password confirmation failed");
        return;
      }
      if (newPassword.length < 6) {
        alert("Password should be at least 6 characters long.");
        return false;
      }
      let response = await axios.patch(`http://localhost:3000/user/${id}`,{
        currentPassword,
        newPassword
      })
      console.log("response : ",response);
      if(response.data.statusCode === 200) {
        let data = response.data;
        console.log("reset_password_count : ",data.data.reset_password_count)
        alert(data.message);
        if(data.data.login_count === "null" && data.data.reset_password_count === "null"){
            navigate('/')
        }else{
            navigate(`/employee/${id}`);
        }
    }else{
        alert(response.data.message);
    }

    } catch (error) {
      console.log("error : ",error);
    }

  }


  return (
    <div className='flex flex-col gap-10 justify-center items-center p-20'>
      <div className='flex justify-center items-center'>
        <p className='text-2xl font-bold text-white'>Reset your Password</p>
      </div>
      <form onSubmit={handleResetPassword} className='w-4/6 flex flex-col gap-10 justify-center items-center p-10 border-white border-2 rounded-md'>
        <div className='flex flex-col gap-3 w-full'>
          <label htmlFor="current password" className='text-white'>Current Password</label>
          <input onChange={(e) => setCurrentPassword(e.target.value)} id="password" name="password" type="password" autocomplete="password" className="w-full rounded-md border border-stone-950 p-2" />
        </div>
        <div className='flex flex-col w-full gap-3'>
          <label htmlFor="new Password" className='text-white'>new Password</label>
          <input onChange={(e) => setNewPassword(e.target.value)} id="new Password" name="new Password" type="password" autocomplete="password" className="w-full rounded-md border border-stone-950 p-2" />
          <label className='text-gray-400'>password should atleast 6 characters</label>
        </div>
        <div className='flex flex-col w-full gap-3'>
          <label htmlFor="confirm Password" className='text-white'>confirm Password</label>
          <input onChange={(e) => setConfirmPassword(e.target.value)} id="confirm Password" name="confirm Password" type="password" autocomplete="password" className="w-full rounded-md border border-stone-950 p-2" />
        </div>
        <div>
          <input type="submit" className='bg-green-800 text-white px-3 py-2 rounded-md' value="submit" />
        </div>
      </form>
    </div>
  )
}

export default ResetPasswordEmployee
