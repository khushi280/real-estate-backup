import React, { useState } from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth' 
import { app } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const OAuth = () => {
  const [user,setuser]=useState(null);
  const navigate=useNavigate()
    const handleGoogleClick=async()=>{
        try{
            const provider=new GoogleAuthProvider()
            const auth=getAuth(app)
            const result=await signInWithPopup(auth, provider)
            
            const res=await fetch('/api/auth/google',{
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({name:result.user.displayName, email: result.user.email })
            })
            const data=await res.json();
            
            if (data.success) {
              const { userData } = await axios.get('/profile');
              setuser(userData);
              navigate('/profiles')
          }
            
        }catch(error){
            console.log("Could not sign in with google");
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Continue with google</button>
  )
}

export default OAuth
