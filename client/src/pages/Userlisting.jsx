import React, { useEffect, useState } from 'react';
import listingService from '../apiservice/ListingService';
import ListingItem from '../components/ListingItem';
import { useAuth } from '../context/userContext';

const UserListing = () => {
  const authContext = useAuth();
  const { user } = authContext;
  const [listings, setListing] = useState([]);
  const [loading, setLoading] = useState(true); 

  const getListingsById = async () => {
    try {
      const res = await listingService.getuserListingById(user.id);
      console.log('Listing Response:', res); 
      setListing(res);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getListingsById();
  }, []);

  

  if (loading) {
    return <p className='text-3xl font-semibold text-center mt-7'>Loading...</p>; 
  }

  return (
    <div>
      <div>
        <h1 className='text-3xl font-semibold text-center mt-7'>Your Listings</h1>
      </div>
      <div className='mt-7 flex flex-wrap gap-4 justify-center'>
        {listings.length > 0 ? (
          listings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} getListingsById={getListingsById} />
          ))
        ) : (
          <p className='text-xl font-semibold text-center mt-7 mb-32'>No Listings Found</p>
        )}
      </div>
    </div>
  );
};

export default UserListing;
