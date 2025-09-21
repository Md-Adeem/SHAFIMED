import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../store/slices/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // ✅ Use Redux logout action which handles both Redux state and localStorage
    dispatch(logoutAction());

    // ✅ Show logout message
    toast.success("Logout Successful ✅");
    
    // ✅ Redirect to login page
    navigate("/login");
  }, [navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h2 className="text-xl font-semibold text-gray-700">
        Logging you out...
      </h2>
    </div>
  );
};

export default Logout;










