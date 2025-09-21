function Badge({ children, color = "gray", className = "" }) {
  const colors = {
    gray: "bg-gray-100 text-gray-700 border border-gray-200",
    teal: "bg-teal-100 text-teal-800 border border-teal-200",
    emerald: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    blue: "bg-blue-100 text-blue-800 border border-blue-200",
    green: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    red: "bg-red-100 text-red-800 border border-red-200",
    amber: "bg-amber-100 text-amber-800 border border-amber-200",
    yellow: "bg-amber-100 text-amber-800 border border-amber-200",
    success: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    warning: "bg-amber-100 text-amber-800 border border-amber-200",
    error: "bg-red-100 text-red-800 border border-red-200",
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors[color]} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
