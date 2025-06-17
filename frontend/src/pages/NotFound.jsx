// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-medium text-gray-800 mb-4">Sorry, this page isn't available.</h1>
      <p className="text-gray-600 mb-6">The link you followed may be broken, or the page may have been removed. <Link to="/" className="text-blue-500 underline">Go back to Home</Link></p>
      
    </div>
  );
};

export default NotFound;
