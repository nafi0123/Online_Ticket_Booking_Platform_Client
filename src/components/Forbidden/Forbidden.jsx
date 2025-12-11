import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 px-4">
      <div className="relative max-w-md w-full">
        {/* Background Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-3xl blur-xl opacity-30"></div>

        {/* Main Card */}
        <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
          {/* 403 Number */}
          <h1 className="text-9xl font-black bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent leading-none">
            403
          </h1>

          {/* Title */}
          <h2 className="mt-6 text-4xl font-bold text-gray-800 dark:text-white">
            Access Forbidden
          </h2>

          {/* Description */}
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Sorry, you don't have permission to access this page.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Please check your role or contact admin if you think this is a mistake.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn btn-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-lg px-10 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
            >
              Back to Home
            </Link>

            <Link
              to="/dashboard"
              className="btn btn-lg btn-outline border-2 border-[#667eea] text-[#667eea] hover:bg-[#667eea] hover:text-white font-bold text-lg px-10 transition-all duration-300"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Decorative Bottom Line */}
          <div className="mt-10 flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;