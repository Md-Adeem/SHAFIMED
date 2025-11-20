import React from "react";

export default function PatientMyCaseShimmer() {
  return (
    <div className="animate-pulse">

      {/* Tabs + Search */}
      <div className="bg-white rounded-xl shadow border p-5 mb-4">
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-7 w-16 bg-gray-200 rounded-full"
            ></div>
          ))}

          <div className="ml-auto w-full sm:w-64">
            <div className="h-9 w-full bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="border-b bg-gray-50 h-12"></div>

        <div className="divide-y">
          {[1, 2, 3, 4].map((row) => (
            <div key={row} className="flex items-center px-5 py-4 gap-5">

              <div className="w-40 h-4 bg-gray-200 rounded"></div>
              <div className="w-28 h-4 bg-gray-200 rounded"></div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>

              <div className="ml-auto h-8 w-16 bg-gray-200 rounded"></div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



