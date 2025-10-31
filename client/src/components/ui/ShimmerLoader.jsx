export default function ShimmerLoader({ rows = 5 }) {
  return (
    <div className="animate-pulse divide-y divide-gray-200">
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center p-4"
        >
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/5"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          
        </div>
      ))}
    </div>
  );
}
