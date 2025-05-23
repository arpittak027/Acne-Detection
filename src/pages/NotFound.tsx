import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <AlertCircle className="mx-auto h-12 w-12 text-danger-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Page not found</h2>
          <p className="mt-2 text-sm text-gray-600">
            The page you're looking for doesn't exist or you don't have permission to access it.
          </p>
        </div>
        <div className="mt-6">
          <Link
            to="/"
            className="btn-primary inline-flex items-center justify-center"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;