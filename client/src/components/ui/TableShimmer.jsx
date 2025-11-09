
import React from "react";

export default function TableShimmer() {
  return (
    <div className="overflow-x-auto mt-4 border rounded-lg border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            {[
              "Patient",
              "Reference",
              "Title",
              "Department",
              "Assigned Doctor",
              "Status",
              "Created",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {[...Array(16)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(8)].map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <div className="relative overflow-hidden h-4 bg-gray-200 dark:bg-gray-700 rounded">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-[shimmer_1.5s_infinite]"></div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
