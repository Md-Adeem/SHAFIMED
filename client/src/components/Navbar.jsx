import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../store/slices/authSlice";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((s) => s.auth);
  const isLoggedIn = !!token;
  const role = user?.role;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" 
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className={`text-2xl font-extrabold transition-colors duration-300 ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}>
        ShafiMed
            </span>
      </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-semibold transition-all duration-200 hover:scale-105 ${
                isScrolled 
                  ? "text-gray-700 hover:text-cyan-600" 
                  : "text-white/90 hover:text-white"
              }`}
            >
              🏠 Home
            </Link>

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
                  className={`font-semibold transition-all duration-200 hover:scale-105 ${
                    isScrolled 
                      ? "text-gray-700 hover:text-cyan-600" 
                      : "text-white/90 hover:text-white"
                  }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
                  Get Started
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
                  className={`font-semibold transition-all duration-200 hover:scale-105 ${
                    isScrolled 
                      ? "text-gray-700 hover:text-cyan-600" 
                      : "text-white/90 hover:text-white"
                  }`}
            >
              Dashboard
            </Link>
                {role === "facilitator" && (
            <Link
                    to="/facilitator"
                    className={`font-semibold transition-all duration-200 hover:scale-105 ${
                      isScrolled 
                        ? "text-gray-700 hover:text-cyan-600" 
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    Facilitator
            </Link>
                )}
            <Link
              to="/my-cases"
                  className={`font-semibold transition-all duration-200 hover:scale-105 ${
                    isScrolled 
                      ? "text-gray-700 hover:text-cyan-600" 
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  My Cases
                </Link>
                
                {/* User Dropdown */}
                <div className="relative group">
                  <button className={`flex items-center space-x-2 font-semibold transition-all duration-200 hover:scale-105 ${
                    isScrolled 
                      ? "text-gray-700 hover:text-cyan-600" 
                      : "text-white/90 hover:text-white"
                  }`}>
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span>{user?.name || "User"}</span>
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
            </Link>
            <button
              onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isScrolled 
                  ? "text-gray-700 hover:bg-gray-100" 
                  : "text-white hover:bg-white/10"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 mt-2 mb-4 overflow-hidden">
            <div className="px-4 py-2 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 font-semibold hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏠 Home
              </Link>

              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 font-semibold hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg text-center hover:from-cyan-700 hover:to-blue-700 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-gray-700 font-semibold hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {role === "facilitator" && (
                    <Link
                      to="/facilitator"
                      className="block px-3 py-2 text-gray-700 font-semibold hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Facilitator
                    </Link>
                  )}
                  <Link
                    to="/my-cases"
                    className="block px-3 py-2 text-gray-700 font-semibold hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Cases
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-gray-700 font-semibold hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 font-semibold hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
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
