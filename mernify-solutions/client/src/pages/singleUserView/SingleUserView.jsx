import React, { useEffect, useState } from 'react'
import './singleUserView.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function SingleUserView() {

  const navigate = useNavigate();
  const params = useParams();
  const authId = params.authId;
  const id = params.id;
  const [user, setUser] = useState('');
  const [user_type, setUser_type] = useState('');

  const returnToAdmin = function(authId) {
    navigate(`/admin/${authId}`);
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${id}`);
        const data = response.data.data;

        setUser(data);
        setUser_type(data.user_type.user_type);
        console.log("user : ",user,typeof(user));

      } catch (error) {
        console.error(
          "Error fetching users:",
          error.response?.data || error.message
        );
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='singleUserBG'>
      <nav className='flex justify-end p-3 bg-gray-400'>
        <button onClick={() => {returnToAdmin(authId)}} className='bg-gray-500 text-white px-3 py-2 rounded-md'>home</button>
      </nav>
      {/* body */}
      <div className='w-4/5 m-auto p-20'>
        <div className='grid grid-cols-2 p-10 justify-center items-center gap-10 border-2 rounded-xl'>
          <div className='flex justify-end'>
            <img className='size-96 rounded-full border-8' src={`http://localhost:3000/${user.image}`} alt="" />
          </div>
          <div className='flex justify-center items-start gap-10'>

            <div className='flex flex-col gap-16'>
              <span className='text-xl text-white'>Name</span>
              <span className='text-xl text-white'>Email</span>
              <span className='text-xl text-white'>Age</span>
              <span className='text-xl text-white'>Role</span>
            </div>
            <div className='flex flex-col gap-16'>
              <span className='text-white text-xl font-bold'>{user.name}</span>
              <span className='text-white text-xl font-semibold'>{user.email}</span>
              <span className='text-white text-xl font-semibold'>{user.age}</span>
              <span className='text-white text-xl font-semibold'>{user_type}</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleUserView
