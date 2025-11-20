import React from "react";

const PatientProfileShimmer = () => {
  return (
    <div className="max-w-2xl animate-pulse">
      <div className="bg-white rounded-xl shadow border p-6 space-y-6">

        {/* Age + Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 w-full shimmer animate-shimmer rounded-lg"></div>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="space-y-2">
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-10 w-full shimmer animate-shimmer rounded-lg"></div>
        </div>

        {/* Height + Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 w-full shimmer animate-shimmer rounded-lg"></div>
            </div>
          ))}
        </div>

        {/* Blood Group */}
        <div className="space-y-2">
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-10 w-full shimmer animate-shimmer rounded-lg"></div>
        </div>

        {/* Medical History */}
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-24 w-full shimmer animate-shimmer rounded-lg"></div>
        </div>

        {/* Medications + Allergies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 w-full shimmer animate-shimmer rounded-lg"></div>
            </div>
          ))}
        </div>

        {/* Emergency Contact + Relation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-44 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 w-full shimmer animate-shimmer rounded-lg"></div>
            </div>
          ))}
        </div>

        {/* Insurance Info */}
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-10 w-full shimmer animate-shimmer rounded-lg"></div>
        </div>

        {/* Save button */}
        <div className="h-12 w-full shimmer animate-shimmer rounded-lg mt-2"></div>
      </div>
    </div>
  );
};

export default PatientProfileShimmer;


