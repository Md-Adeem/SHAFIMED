export default function ShimmerAnalytics() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 rounded-xl border bg-white shadow-sm flex flex-col justify-between"
          >
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* By Status */}
        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex justify-center items-center">
            <div className="w-64 h-64 rounded-full bg-gray-200"></div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 w-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>

        {/* By Department */}
        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="flex justify-center items-center">
            <div className="w-72 h-72 rounded-full bg-gray-200"></div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="h-4 w-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
