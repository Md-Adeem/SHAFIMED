function Label({ children }) {
  return <label className=" block text-sm font-semibold 
        text-gray-800 
        dark:text-gray-200">{children}</label>;
}

function Input({ className = "", ...props }) {
  return (
    <input
      // className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500 ${className}`}
       className={`mt-1 w-full px-4 py-2 border rounded-lg
    border-gray-300 text-gray-900
    dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
    focus:ring-2 focus:ring-cyan-500 ${className}`}
      {...props}
    />
  );
}

function Textarea({ className = "", rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      // className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500 ${className}`}
      className={`mt-1   w-full px-4 py-2 border rounded-lg
    border-gray-300 text-gray-900
    dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
    focus:ring-2 focus:ring-cyan-500 ${className}`}
      {...props}
    />
  );
}

export { Label, Input, Textarea };

