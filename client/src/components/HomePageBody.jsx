import React from 'react';
import herobackground from "../assets/herobackground.mp4";

const HomePageBody = () => {
    return (
        <div className="relative flex flex-col md:flex-row items-center">
            {/* Video background */}
            <video className="absolute inset-0 w-full h-customheight object-cover" autoPlay muted loop src='https://ik.imagekit.io/gxfevgd2d/herobackground.mp4?updatedAt=1715613442406' type="video/mp4" style={{ filter: "brightness(0.8)" }} />
        
            {/* Content */}
            <div className="relative mt-64 z-10 text-white text-center md:text-left md:ml-16 lg:self-start">
                <div className="text-6xl font-bold">
                    Discover Your <span className="text-gray-400">Perfect</span>
                </div>
                <div className="text-6xl font-bold">Space</div>
                <div className="mt-8">
                    Browse Top Real Estate Listings for Your Ideal Home or Investment Opportunity
                </div>
                {/* Add more content here */}
            </div>
        </div>
    );
};

export default HomePageBody;
