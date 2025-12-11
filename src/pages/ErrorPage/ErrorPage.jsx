import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="text-center space-y-8">
        {/* 404 Text */}
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#667eea] to-[#764ba2]">
          404
        </h1>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-base-content">
            Page Not Found
          </h2>
          <p className="text-base-content/70">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Button */}
        <Link
          to="/"
          className="group inline-flex items-center gap-3 px-10 py-4 
             bg-gradient-to-r from-[#667eea] to-[#764ba2] 
             text-white font-bold text-lg rounded-full 
             hover:shadow-2xl hover:shadow-[#667eea]/40 
             transform hover:scale-105 transition-all duration-300"
        >
          Back to Home
          <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
