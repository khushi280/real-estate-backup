import React from 'react'
import HomePageBody from '../components/HomePageBody'
import HomeRecntOffercard from '../components/HomeRecntOffercard'
const Home = () => {
  return (
    <div>
      <HomePageBody></HomePageBody>
      <div className='mt-80'>
        <HomeRecntOffercard></HomeRecntOffercard>
        
      </div>
                      

    </div>
  )
}

export default Home
