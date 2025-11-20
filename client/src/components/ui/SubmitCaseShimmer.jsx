import React from "react";

export default function SubmitCaseShimmer() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">

      {/* LEFT FORM SECTION */}
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow border p-6 space-y-6">

        {/* Profile Info Banner */}
        <div className="h-20 rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
          dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer" />

        {/* Each input field shimmer */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
              dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer"></div>
          </div>
        ))}

        {/* Description textarea */}
        <div className="space-y-2">
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-28 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
            dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer"></div>
        </div>

        {/* Country + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
                dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer"></div>
            </div>
          ))}
        </div>

        {/* Location + Department */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
                dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer"></div>
            </div>
          ))}
        </div>

        {/* Additional notes */}
        <div className="space-y-2">
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-20 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
            dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer"></div>
        </div>

        {/* Upload box */}
        <div className="space-y-2">
          <div className="h-4 w-52 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-20 w-full border-2 border-dashed rounded-xl bg-gradient-to-r
            from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer" />
        </div>

        {/* Submit button */}
        <div className="h-12 w-full rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
          dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer" />

      </div>

      {/* RIGHT SIDEBAR SECTION */}
      <div className="space-y-6">

        {/* Tips card */}
        <div className="h-40 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
          dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer"></div>

        {/* Services card */}
        <div className="h-48 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
          dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer"></div>

        {/* Support card */}
        <div className="h-40 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
          dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer"></div>
      </div>
    </div>
  );
}

