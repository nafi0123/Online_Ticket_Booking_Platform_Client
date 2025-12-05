import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  px-4">
      <div className="bg-red-100 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-6xl font-extrabold text-red-500 mb-4">403</h1>
        <h2 className="text-3xl font-bold text-red-600 mb-2">
          Access Forbidden
        </h2>
        <p className="text-gray-700 mb-6">
          You are not authorized to view this page.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Home
          </Link>
          <Link
            to="/dashboard"
            className="btn btn-secondary px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;