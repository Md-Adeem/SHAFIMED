function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) {
  const variants = {
    primary: "bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-200",
    outline: "border-2 border-teal-600 hover:bg-teal-50 text-teal-700 hover:text-teal-800",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl",
    info: "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
        variants[variant]
      } ${sizes[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
