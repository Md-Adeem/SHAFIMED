function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-xl shadow border ${className}`}>{children}</div>;
}

function CardHeader({ children, className = "" }) {
  return <div className={`px-5 py-4 border-b ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>;
}

function CardFooter({ children, className = "" }) {
  return <div className={`px-5 py-4 border-t ${className}`}>{children}</div>;
}

export { Card, CardHeader, CardContent, CardFooter };

