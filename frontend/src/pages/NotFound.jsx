import React from "react";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <AlertTriangle className="w-24 h-24 text-red-500 mb-5 animate-pulse" />
      <h1 className="text-6xl font-extrabold text-gray-900 mb-3">404</h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-5 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <button className="px-4 py-3 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
        <Link to="/">Go Back Dashboard</Link>
      </button>
    </div>
  );
};

export default NotFound;
