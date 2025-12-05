import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BusImage from "../../../assets/Banner/pn.jpg";
import PlainImage from "../../../assets/banner/disney-adventure-ship.jpg";
import TrainImage from "../../../assets/banner/train1.jpg";

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
            
            {/* 🌟 নতুন ডিজাইন: Gradient Overlay এবং Bottom-Left Positioning 🌟 */}
            
            {/* 1. Gradient Overlay: নিচের দিকে কালো গ্রেডিয়েন্ট, ছবিকে অন্ধকার না করে টাইটেলকে স্পষ্ট করবে */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            {/* 2. Title Container: বামদিকে নিচের কোণে পজিশন করা হয়েছে */}
            <div className="absolute bottom-0 left-0 p-6 md:p-10 z-10 text-left">
                
              {/* 3. Title Style: White Text + Text Shadow (tailwind এর default config এ text-shadow নেই, তাই এখানে custom style ব্যবহার করা হয়েছে বা ধরে নিচ্ছি আপনার config এ আছে। যদি না থাকে, শুধু bold ব্যবহার করুন) */}
              <h2 
                className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold mb-2"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }} // নিশ্চিতভাবে শ্যাডো দেওয়ার জন্য inline style
              >
                {titles[index]}
              </h2>
                
              <p 
                className="text-gray-100 text-lg md:text-xl font-medium"
                style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)' }}
              >
                {subtitles[index]}
              </p>

              {/* চাইলে এখানে একটি সুন্দর বাটনও যোগ করতে পারেন */}
              <button className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-300">
                Explore Now
              </button>
            </div>
            {/* 🌟 End Title Overlay Design 🌟 */}
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;