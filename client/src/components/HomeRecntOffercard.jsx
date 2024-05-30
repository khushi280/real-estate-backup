import React, { useEffect, useState } from 'react'
import cardimage from "../assets/cardimage.png"
import { Link } from 'react-router-dom'
import ListingItem from "../components/ListingItem"

const HomeRecntOffercard = () => {

  const[offer, setoffer]=useState([]);
  const[rent, setrent]=useState([]);
  const[sale, setsale]=useState([]);
  
  useEffect(()=>{
    const fetchoffer=async()=>{
      try{
        const res=await fetch(`http://localhost:3000/listing?offer=true&limit=3`);
        const data=await res.json();
        setoffer(data);
        fetchrent();
      }
      catch(error){
        console.log(error);
      }
    }

    const fetchrent=async()=>{
      try {
        const res=await fetch(`http://localhost:3000/listing?type=rent&limit=3`);
        const data=await res.json();
        setrent(data);
        fetchsale();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchsale=async()=>{
      try {
        const res=await fetch(`http://localhost:3000/listing?type=sale&limit=3`);
        const data=await res.json();
        setsale(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchoffer()
  }
,[])

  return (
    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 justify-center'>
        {offer && offer.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offer.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rent && rent.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rent.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {sale && sale.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {sale.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

  )
}

export default HomeRecntOffercard
