
import React from 'react';
import FacilitatorLayout from '../../components/layout/FacilitatorLayout';

const Failed = () => {
  return (
    <FacilitatorLayout title="Failed Cases">
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-red-600 dark:text-red-400">
            Failed Cases
          </h1>
          <p className="mt-4 text-2xl font-bold text-red-600 dark:text-red-400">
            This feature is currently under development.
          </p>
        </div>
      </div>
    </FacilitatorLayout>
  );
}

export default Failed;
