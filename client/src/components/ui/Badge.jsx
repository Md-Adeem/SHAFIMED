function Badge({ children, color = "gray", className = "" }) {
  const colors = {
    gray: "bg-gray-200 text-gray-800",
    yellow: "bg-yellow-500 text-white",
    blue: "bg-blue-600 text-white",
    green: "bg-green-600 text-white",
    red: "bg-red-600 text-white",
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors[color]} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;

