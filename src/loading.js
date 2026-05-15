import React from "react";

const loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex gap-10 items-center">
        
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-gray-200 border-t-sky-500 rounded-full animate-spin"></div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800">
          Loading...
        </h2>

        {/* Skeleton UI */}
        <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>

      </div>
    </div>
  );
};

export default loading;