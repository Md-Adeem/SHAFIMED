
export default function PatientShimmer() {
  return (
    <div className="animate-pulse space-y-6">
      
      {/* Header shimmer */}
      <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>

      {/* Three card shimmer blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="
              bg-white dark:bg-gray-800
              rounded-xl shadow border 
              border-gray-200 dark:border-gray-700
              p-5 space-y-4
            "
          >
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>

            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg mt-4"></div>
          </div>
        ))}

      </div>

      {/* Table shimmer */}
      <div
        className="
          bg-white dark:bg-gray-800 
          rounded-xl shadow border 
          p-5 space-y-4 
          border-gray-200 dark:border-gray-700
        "
      >
        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>

        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"
            ></div>
          ))}
        </div>
      </div>

    </div>
  );
}
