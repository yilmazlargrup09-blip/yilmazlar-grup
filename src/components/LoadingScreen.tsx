import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-gray-900 dark:border-white"></div>
    </div>
  );
};

export default LoadingScreen;

