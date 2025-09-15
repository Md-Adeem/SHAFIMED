import { Navigate } from "react-router-dom";

function RoleRoute({ children, allow = [] }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  let role = null;
  try { role = JSON.parse(localStorage.getItem("user") || "{}").role; } catch {}
  if (allow.length > 0 && !allow.includes(role)) return <Navigate to="/" replace />;
  return children;
}

export default RoleRoute;

