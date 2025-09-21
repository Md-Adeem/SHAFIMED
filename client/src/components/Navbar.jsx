import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../store/slices/authSlice";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
// import LanguageSwitcher from "./LanguageSwitcher";

function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((s) => s.auth);
  const isLoggedIn = !!token;
  const role = user?.role;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ Auto-sync logout if token disappears (fixes UI bug)
  useEffect(() => {
    if (!token) {
      dispatch(logoutAction());
    }
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  // Track scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Centralized navigation items
  const navItems = [
    { label: t('navigation.home'), path: "/", icon: "🏠", show: true },
    { label: t('navigation.dashboard'), path: "/dashboard", show: isLoggedIn },
    { label: "Facilitator", path: "/facilitator", show: isLoggedIn && role === "facilitator" },
    { label: "My Cases", path: "/my-cases", show: isLoggedIn },
  ];

  // const scrolledText = isScrolled
  //   ? "text-gray-700 hover:text-cyan-600"
  //   : "text-gray-700 hover:text-cyan-600";

  // const scrolledButton = isScrolled
  //   ? "text-gray-700 hover:text-cyan-600"
  //   : "text-gray-700 hover:text-cyan-600";

  const mobileScrolled = isScrolled
    ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200"
    : "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${mobileScrolled}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <span
              className="text-2xl font-extrabold transition-colors text-gray-900"
            >
              ShafiMed
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems
              .filter((item) => item.show)
              .map(({ label, path, icon }) => (
                <Link
                  key={path}
                  to={path}
                  className="text-gray-700 font-bold transition hover:scale-105"
                >
                  {icon && <span className="mr-1">{icon}</span>}
                  {label}
                </Link>
              ))}

            {/* Language Switcher */}
            {/* <LanguageSwitcher /> */}

            {!isLoggedIn ? (
              <>  
                <Link
                  to="/login"
                  className="font-bold text-gray-700 transition hover:scale-105"
                >
                  {t('auth.login')}
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition"
                >
                  {t('auth.signup')}
                </Link>
              </>
            ) : (
              // User Dropdown
              <div className="relative group">
                <button
                  className="flex items-center gap-2 font-medium transition hover:scale-105 text-gray-700 hover:text-teal-600"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
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
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    {t('navigation.profile')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                  >
                    {t('auth.logout')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md transition text-gray-700 hover:text-cyan-600"
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
              {navItems
                .filter((i) => i.show)
                .map(({ label, path }) => (
                  <Link
                    key={path}
                    to={path}
                    className="block px-3 py-2 text-gray-700 font-medium hover:bg-teal-50 hover:text-teal-600 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}

              {/* Mobile Language Switcher */}
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>

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
                    className="block px-3 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-lg text-center hover:from-teal-700 hover:to-emerald-700 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-gray-700 font-medium hover:bg-teal-50 hover:text-teal-600 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
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