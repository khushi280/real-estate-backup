import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import listingService from '../apiservice/ListingService'; 
import { useState } from 'react';
import { useAuth } from '../context/userContext';
const ListingItem=({ listing, getlistingsbyid })=> {

  const authContext = useAuth()  
  const { isLoggedIn, logout, user } = authContext
  
  const handleListingDelete = async (listingId) => {
    try {
        
        const res = await listingService.deleteListing(listingId);
        
       
        if (res.status) {
          getlistingsbyid();
            console.log('Listing deleted successfully');
        } else {
            console.error('Error deleting listing:', res.statusText);
        }
    } catch (error) {
        
        console.error('Error deleting listing:', error.message, error.response);
    }
};


  return (
    <div >
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className="w-full transition-transform duration-300 transform hover:scale-105 h-72 object-cover"
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
      {listing.userRef===user.id && (
      <div className='flex flex-row gap-5 ml-4 mb-4 item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/UpdateListing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>)}
    </div>
    </div>
  );
}
export default ListingItem;