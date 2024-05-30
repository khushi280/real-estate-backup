import React, { useRef, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';
import userService from '../apiservice/UserService';
import { useAuth } from '../context/userContext';



const SignUp = () => {
//   const [formdata, setFormdata]=useState({})
//   const [error, setError]=useState(null);
//   const [loading, setLoading]=useState(false);
//   const navigate= useNavigate();
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
//   const res=await fetch('/api/auth/signup',{
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
//   navigate('/signin');
    
//   } catch (error) {
//     setLoading(false);
//     setError(data.message)
//   }
const navigate= useNavigate();
const authContext = useAuth()
const { isLoggedIn,login, logout, user } = authContext
const usernameRef=useRef();
const emailRef=useRef();
const passRef=useRef();

const [message, setMessage] = useState('');
const [loading, setLoading]=useState(false);


const handleSubmit = async (e) =>{
  e.preventDefault()
  const newUSer = {
    username: usernameRef.current.value,
    email: emailRef.current.value,
    password: passRef.current.value,
    
  }
  
  setLoading(true);
  const res = await userService.registerUser(newUSer);
  
  if(res.status){
    setMessage("New User Added")
    
    usernameRef.current.value=""
    emailRef.current.value=""
   passRef.current.value=""
    setLoading(false);
    navigate('/')
  } else {
    setLoading(false);
    setMessage(res.message)
  }
}
  


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-8'>
        Sign Up
      </h1>
      <form className='flex flex-col gap-4 mt-5'onSubmit={handleSubmit}>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' ref={usernameRef}/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' ref={emailRef}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' ref={passRef}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {message && <p className='text-red-500 mt-5'>{message}</p> }
    </div>
  )
}

export default SignUp
