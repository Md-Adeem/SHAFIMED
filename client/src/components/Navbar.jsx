import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../store/slices/authSlice";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { token, user } = useSelector((s) => s.auth);
  const isLoggedIn = !!token;
  const role = user?.role;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      dispatch(logoutAction());
    }
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  // Smooth scroll handler
  const handleScrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftNavItems = [
    { label: "Home",action: () => handleScrollToSection("hero-section"), show: true },
    {
      label: "Lowest Quotes",
      action: () => handleScrollToSection("lowest-quotes"),
      show: true,
    },
    {
      label: "Hospitals",
      action: () => handleScrollToSection("hospitals-strip"),
      show: true,
    },
    {
      label: "Amenities",
      action: () => handleScrollToSection("services"),
      show: true,
    },
    
    { label: " About", path: "/about", show: true },
    { label: " Contact", path: "/contact", show: true },
  ];

  const navbarStyle = isScrolled
    ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200"
    : "bg-white/90 backdrop-blur-md shadow border-b border-gray-100";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${navbarStyle}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              {leftNavItems
                .filter((item) => item.show)
                .map(({ label, path, action }) =>
                  action ? (
                    <button
                      key={label}
                      onClick={action}
                      className="text-gray-700 font-semibold hover:text-teal-600 transition"
                    >
                      {label}
                    </button>
                  ) : (
                    <Link
                      key={path}
                      to={path}
                      className="text-gray-700 font-semibold hover:text-teal-600 transition"
                    >
                      {label}
                    </Link>
                  )
                )}
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-5">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-sm font-semibold text-white hover:text-white hover:scale-105 transition-all duration-100 rounded-full bg-teal-700 hover:bg-teal-800"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2 text-sm font-semibold bg-white text-teal-700 rounded-full shadow hover:scale-105 hover:bg-white/90 hover:shadow-lg transition-all duration-300"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/facilitator")}
                  className="text-black px-4 py-2 rounded-md font-semibold shadow-sm hover:bg-gray-100 transition-all duration-200"
                >
                  Facilitator Dashboard
                </button>

                {/* Profile Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-2 font-medium text-gray-700 hover:text-teal-600 transition">
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span>{user?.name || "User"}</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {role === "patient" && (
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                      >
                        Profile
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md transition text-gray-700 hover:text-teal-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg shadow-md border border-gray-200 mt-2">
            <div className="px-4 py-2 space-y-1">
              {leftNavItems
                .filter((i) => i.show)
                .map(({ label, path, action }) =>
                  action ? (
                    <button
                      key={label}
                      onClick={() => {
                        action();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-700 font-medium hover:bg-teal-50 hover:text-teal-600 rounded-lg"
                    >
                      {label}
                    </button>
                  ) : (
                    <Link
                      key={path}
                      to={path}
                      className="block px-3 py-2 text-gray-700 font-medium hover:bg-teal-50 hover:text-teal-600 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  )
                )}

              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 font-medium hover:bg-teal-50 hover:text-teal-600 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-teal-600 text-white font-semibold rounded-lg text-center hover:bg-teal-700 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  {role === "patient" && (
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-gray-700 font-medium hover:bg-teal-50 hover:text-teal-600 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 font-medium hover:bg-red-50 hover:text-red-600 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
