import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        {/* Outer spinner - primary color */}
        <div className="absolute w-full h-full rounded-full border-4 border-gray-200 border-t-[#CAEB66] animate-spin"></div>
        {/* Inner spinner - black */}
        {/* <div className="absolute w-10 h-10 top-1.5 left-1.5 rounded-full border-4 border-gray-200 border-t-black animate-spin"></div> */}
      </div>
    </div>
  );
};

export default Loading;