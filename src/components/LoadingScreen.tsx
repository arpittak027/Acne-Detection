import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="animate-pulse flex space-x-2">
            <div className="h-3 w-3 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
            <div className="h-3 w-3 bg-primary-600 dark:bg-primary-400 rounded-full animation-delay-200"></div>
            <div className="h-3 w-3 bg-primary-600 dark:bg-primary-400 rounded-full animation-delay-400"></div>
          </div>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Loading DermAI</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Please wait while we prepare your experience</p>
      </div>
    </div>
  );
};

export default LoadingScreen;