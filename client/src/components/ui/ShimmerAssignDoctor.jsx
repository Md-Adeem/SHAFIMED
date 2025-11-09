export default function ShimmerAssignDoctor() {
  return (
    <div className="flex gap-2 items-center animate-pulse">
      {/* Dropdown shimmer */}
      <div className="h-8 w-48 bg-gray-200 rounded"></div>
      {/* Button shimmer */}
      <div className="h-8 w-20 bg-gray-200 rounded"></div>
    </div>
  );
}
