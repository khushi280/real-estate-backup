import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from '../context/userContext';
import profileimg from "../assets/profileimg.png";
const Header = () => {
    const[search,setsearch]=useState("")
    const navigate=useNavigate()
    const authContext = useAuth()
    
    const { isLoggedIn, logout, user } = authContext
    const[hamburger,setHamburger]=useState(false);
    if(hamburger){
        return(
            <div className='fixed flex flex-col top-0 left-0 bg-gray-300 rounded-xl p-3 mx-auto shadow-md z-20 w-full items-center'>
                 <RxCross2 className='custom-icon cursor-pointer' onClick={()=>setHamburger(false)}/>
                 <div className='flex flex-col text-center font-bold cursor-pointer'>
                 <div className='hover:underline cursor-pointer'>
                        <Link to="/">Home</Link></div>
                    <div className='hover:underline cursor-pointer'>
                        <Link to="/about">About</Link></div>
                    <div className='hover:underline cursor-pointer'>
                        <Link to="/userlisting">Listing</Link></div>
                        {isLoggedIn ? (
                             <div className='hover:underline cursor-pointer'>
                            <Link to="/profiles">Profile</Link></div>
            ) : (
                <div className='hover:underline cursor-pointer'>
                <Link to="/signin">Sign in</Link></div>
            )}
                </div>
            </div>
        )
    }

    const handlesubmit=(e)=>{
        e.preventDefault();
        const urlparams=new URLSearchParams(window.location.search)
        urlparams.set('searchTerm', search);
        const searchquery=urlparams.toString();
        navigate(`/search?${searchquery}`)

    }
    useEffect(()=>{
        const urlparams=new URLSearchParams(window.location.search)
        const searchterm=urlparams.get('searchTerm')
        if(searchterm){
            setsearch(searchterm)
        }
    },[])


    return (
        <div>
        <div className='fixed top-0 left-0 right-0 bg-gray-300 rounded-xl p-3 mx-auto shadow-md items-center z-20'>
            <div className='flex justify-between max-w-7xl mx-auto items-center'>
                <div className='flex flex-wrap cursor-pointer'>
                    <div className='font-bold text-sm sm:text-xl text-gray-500'>Find</div>
                    <div className='font-bold text-sm sm:text-xl'>YourEstate</div>
                </div>
                <div className='sm:hidden md:flex'>
                    <form onSubmit={handlesubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
                        
                        <input
                            type='text'
                            placeholder='Search...'
                            className='bg-transparent focus:outline-none w-24 sm:w-64'
                            value={search}
                            onChange={(e)=> setsearch(e.target.value)}
                        />
                        <button >
                            <FaSearch className='text-slate-600' />
                        </button>
                    </form>
                </div>
                <div className='flex justify-between gap-5 sm:hidden md:flex'>
                    <div className='hover:underline cursor-pointer'>
                        <Link to="/">Home</Link></div>
                    <div className='hover:underline cursor-pointer'>
                        <Link to="/about">About</Link></div>
                    <div className='hover:underline cursor-pointer'>
                        <Link to="/userlisting">Listing</Link></div>
                        {isLoggedIn ? (
                            <a href="/profiles">
                            
              <img
                
                className='rounded-full h-7 w-7 object-cover'
                src={profileimg}
                alt='profile'
              ></img></a>
            ) : (
                <div className='hover:underline cursor-pointer'>
                <Link to="/signin">Sign in</Link></div>
            )}
                    
                </div>
                <div className='md:hidden sm:flex'>
                    <RxHamburgerMenu className='custom-icon' onClick={()=>setHamburger(true)}/>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Header;
