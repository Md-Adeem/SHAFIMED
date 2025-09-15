import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Remove authentication data (adjust keys if different in your project)
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // ✅ Show optional logout message (for debugging)
    // console.log("User logged out");
    toast.success("Logout Successful ✅");
    // ✅ Redirect to login page
    navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h2 className="text-xl font-semibold text-gray-700">
        Logging you out...
      </h2>
    </div>
  );
};

export default Logout;










