import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

const TopNavbar = () => {
  return (
    <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-2 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 text-sm">
        {/* Left - Brand/Info */}
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
              className="text-2xl font-extrabold transition-colors text-white"
            >
              ShaafiMed
            </span>
          </Link>

       

        {/* Right - Actions */}
        <div className="flex items-center  gap-3">
          
          <button className="bg-red-600 hover:bg-red-700 px-7 py-3 text-white rounded-md text-sm font-semibold">
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
