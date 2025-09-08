import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        ShafiMed
      </Link>

      <div className="space-x-6 flex items-center">
        <Link to="/" className="text-gray-700 font-bold hover:text-blue-600">
          Home
        </Link>

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="text-gray-700 font-bold hover:text-blue-600"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-gray-700 font-bold hover:text-blue-600"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 font-bold hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="text-gray-700 font-bold hover:text-blue-600"
            >
              Profile
            </Link>
            <Link
              to="/my-cases"
              className="text-gray-700 font-bold hover:text-blue-600"
            >
              MyCases
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 font-bold hover:text-blue-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
