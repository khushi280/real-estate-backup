import React, { useState,useRef } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';
import axios from 'axios';
import userService from '../apiservice/UserService';
import { useAuth } from '../context/userContext';

const SignIn = () => {
//   const [formdata, setFormdata]=useState({})
//   const [error, setError]=useState(null);
//   const [loading, setLoading]=useState(false);
//   const [user, setUser]=useState(null)
//     const navigate= useNavigate();
//   const handleChange=(e)=>{
//     setFormdata({
//       ...formdata,
//       [e.target.id]:e.target.value,
//     })
//   }
// console.log(formdata);
// const handleSubmit=async (e)=>{
//   e.preventDefault();
//   try {
//     setLoading(true);
//   const res=await fetch('/api/auth/signin',{
//     method:'POST',
//     headers:{
//       'Content-Type':'application/json',
//     },
//     body: JSON.stringify(formdata)
//   });
//   const data = await res.json();
//   if (data.success==false){
//     setError(data.message);
//     setLoading(false);
//     return;
//   }
//   setLoading(false);
//   setError(null);
//   console.log(data);
//   setUser(data);
//   navigate('/profiles');
    
//   } catch (error) {
//     setLoading(false);
//     setError(data.message)
//   }
  
const navigate= useNavigate();
const authContext = useAuth()
const { login } = authContext 

const emailRef=useRef();
const passRef=useRef();

const [message, setMessage] = useState('');
const [loading, setLoading]=useState(false);


const handleSubmit = async (e) =>{
  e.preventDefault()
  const user = {
    
    email: emailRef.current.value,
    password: passRef.current.value,
    
  }
  // console.log(user);
  setLoading(true);
  const res = await userService.loginUser(user);
  // console.log(res.data);
  if(res.status){
    setMessage("Login Successfull")
    emailRef.current.value=""
    passRef.current.value=""
    setLoading(false);
    login(res.data.token)
    navigate('/')
  } else {
    setLoading(false);
    setMessage(res.message)
  }
}
  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl text-center font-semibold my-8'>
        Sign In
      </h1>
      <form className='flex flex-col gap-4 mt-5'onSubmit={handleSubmit}>
        
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' ref={emailRef}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' ref={passRef}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={"/signup"}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {message && <p className='text-red-500 mt-5'>{message}</p> }
    </div>
  )
}

export default SignIn
