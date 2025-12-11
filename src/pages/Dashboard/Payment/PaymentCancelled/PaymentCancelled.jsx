import React from "react";
import { Link } from "react-router-dom";

const PaymentCancelled = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 px-4">
      <div className="relative max-w-md w-full">
        {/* Background Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-3xl blur-xl opacity-30 animate-pulse"></div>

        {/* Main Card */}
        <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-12 text-center border border-gray-200 dark:border-gray-700">
          {/* Cancel Icon */}
          <div className="mx-auto w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-8">
            <span className="material-symbols-outlined text-6xl text-red-500">
              cancel
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 dark:text-white mb-4">
            Payment Cancelled
          </h1>

          {/* Message */}
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            No worries! Your payment was cancelled safely. Nothing has been
            charged.
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-500 mb-10">
            You can try again anytime. We're ready when you are!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn btn-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-lg px-10 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
            >
              Back to Home
            </Link>

            <Link
              to="/dashboard/my-bookings"
              className="btn btn-lg btn-outline border-2 border-[#667eea] text-[#667eea] hover:bg-[#667eea] hover:text-white font-bold text-lg px-10 transition-all duration-300"
            >
              Try Again
            </Link>
          </div>

          {/* Decorative Line */}
          <div className="mt-10 flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
