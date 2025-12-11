import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100/80 backdrop-blur-sm z-50">
      <div className="relative">
        {/* Main Spinner - Gradient Border */}
        <div className="w-20 h-20 rounded-full animate-spin"
             style={{
               background: 'conic-gradient(from 0deg, transparent, #667eea, #764ba2, transparent)',
               padding: '4px',
             }}>
          <div className="w-full h-full rounded-full bg-base-100"></div>
        </div>

        {/* Center Dot with Pulse */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] shadow-2xl animate-ping"></div>
          <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] opacity-75"></div>
        </div>

        {/* Optional Text */}
        <p className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-sm font-medium text-[#667eea] whitespace-nowrap">
          Loading TicketBari...
        </p>
      </div>
    </div>
  );
};

export default Loading;