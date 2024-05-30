import React, { useRef, useState,useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from '../context/userContext';
import profileimg from "../assets/profileimg.png";
import userService from '../apiservice/UserService';

export default function Profile() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passRef = useRef();
  const usernameRef = useRef();

  const [message, setMessage] = useState('');
  const [message1, setMessage1] = useState('');
  const [loading, setLoading] = useState(false);

  const authContext = useAuth();
  const { logout } = authContext;
  
  const logoutUser = () => {
    logout();
    navigate("/");
  }

  const [userProfile, setUserProfile] = useState(null)

    const getUserProfile = async () => {
        let res = await userService.userProfile()
        if (res.status) {
            
            setUserProfile(res.data)
        }
    }
    useEffect(() => {
      
        getUserProfile()
    }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value || userProfile.password,
    };

    setLoading(true);
    try {
      
      const res = await userService.updateUser(userProfile._id, updatedUser);
      
      
      if (res.status) {
        setMessage("Updated Successfully");
        passRef.current.value="";
      } 
      else {
        setMessage(res.message);
      }
    } catch (error) {
      
      setMessage("Failed to update user");
    }
    setLoading(false);
  }

  const handleDelete = async(e)=>{
    try{
      const res= await userService.deleteUser(user.id);
      if(res.status){
        setMessage1("User deleted successfully");
        logoutUser();
        navigate("/");
        
      }
      else {
        setMessage1(res.message);
      }
    }catch (error) {
      
      setMessage1("Failed to update user");
    }
  }



if(!userProfile) return
  return (
    <div className='p-3  max-w-lg mx-auto gap-4'>
      <h1 className='text-3xl font-semibold text-center my-8'>Profile</h1>
      <form className='flex mt-5 flex-col'>
        <img src={profileimg} alt="profile" className='rounded-full h-28 w-28 object-cover cursor-pointer self-center ' />
        <input ref={usernameRef} type="text" placeholder='username' id='username' className='border mt-8 p-3 rounded-lg' defaultValue={userProfile.username} />
        <input ref={emailRef} type="email" placeholder='email' id='email' className='border mt-2 p-3 rounded-lg' defaultValue={userProfile.email} />
        <input ref={passRef} type="password" placeholder='password' id='password' className='border mt-2 p-3 rounded-lg' />
        <button disabled={loading} className='bg-gray-600 text-white rounded-lg mt-5 p-3 uppercase hover:opacity-95 disabled:opacity-80' onClick={handleSubmit}>{loading ? 'Loading...' : 'Update'}</button>
        <button className='bg-green-800 text-white rounded-lg mt-5 p-3 uppercase hover:opacity-95 disabled:opacity-80'><Link to="/createlisting">Create Listing</Link></button>
      </form>
      {message!="Updated Successfully" ?(<p className='text-red-500 mt-5'>{message}</p>):(<p className='text-green-800 mt-5'>{message}</p>)}
      <div className='flex justify-between mt-5'>
        <span className='text-red-800 cursor-pointer' onClick={handleDelete}>Delete account</span>
        <span className='text-red-800 cursor-pointer' onClick={logoutUser}>Sign out</span>
      </div>
      <button onClick={()=>navigate("/userlisting")} className='text-green-700 w-full'>
        Show Listings
      </button>
      <div>
        {message1 && <p className='text-red-500 mt-5'>{message1}</p>}
      </div>
    </div>
  );
}
