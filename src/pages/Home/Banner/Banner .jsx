import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BusImage from "../../../assets/Banner/pn.jpg";
import PlainImage from "../../../assets/banner/disney-adventure-ship.jpg";
import TrainImage from "../../../assets/banner/train1.jpg";
import { Link } from "react-router";

const images = [BusImage, PlainImage, TrainImage];
const titles = ["Exciting Bus Adventures", "Global Ship Expedition", "Historic Train Journey"];
const subtitles = ["Book your ticket now!", "Experience the high seas!", "Travel back in time."];

const Banner = () => {
  return (
    <section className="mt-4">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={4000}
      >
        {images.map((img, index) => (
          <div 
            key={index} 
            className="w-full h-[500px] md:h-[650px] lg:h-[750px] relative" 
          >
            <img
              src={img}
              alt={titles[index]}
              className="w-full h-full object-cover"
            />
            
            
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-6 md:p-10 z-10 text-left">
                
              <h2 
                className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold mb-2"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }} 
              >
                {titles[index]}
              </h2>
                
              <p 
                className="text-gray-100 text-lg md:text-xl font-medium"
                style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)' }}
              >
                {subtitles[index]}
              </p>

             
              <Link to="/all-tickets" className="mt-4 px-6 py-2 btn btn bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white">
                Explore Now
              </Link>
            </div>
      
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;