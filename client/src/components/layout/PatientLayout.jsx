

// src/components/layout/PatientLayout.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../store/slices/authSlice";
import { Menu, X, Moon, Sun } from "lucide-react";

import { ArrowLeft } from "lucide-react";

 function BackToHome({ onBack }) {
  return (
   <button
  onClick={onBack}
  className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 
             hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-300 shadow-sm"
>
  {/* Arrow with slide animation */}
  <ArrowLeft
    size={20}
    className="transform transition-transform duration-300 group-hover:-translate-x-1"
  />
  <span className="font-medium text-sm group-hover:underline">
    Back to Home
  </span>
</button>
);
}

function PatientLayout({ title, actions, children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("shafimed_dark") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // apply persisted theme on mount
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("shafimed_dark", darkMode ? "true" : "false");
  }, [darkMode]);

  const go = (p) => {
    setSidebarOpen(false);
    navigate(p);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900 dark:to-gray-900 flex">
      {/* -------------- SIDEBAR -------------- */}
      <aside
        className={`
          fixed z-50 inset-y-0 left-0 w-64 transform transition-transform duration-300
          bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-lg flex flex-col justify-between
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
       
        aria-hidden={!sidebarOpen && true}
      >
        {/* Brand header */}
        <div
          onClick={() => go("/")}
          className="px-6 py-6 border-b dark:border-gray-700 cursor-pointer bg-gradient-to-r from-teal-600 to-emerald-700"
        >
          <div className="text-2xl font-extrabold text-white">ShaafiMed</div>
          <div className="text-xs text-teal-100 mt-1">Patient Workspace</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-3 text-gray-800 dark:text-gray-100">
          <button
            onClick={() => go("/profile")}
            className="w-full text-left px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-3"
          >
            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700  group-hover:bg-teal-200 dark:group-hover:bg-teal-600 transition-colors">
            <svg className="w-4 h-4 text-gray-700 dark:text-gray-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
            Profile
          </button>

          <button
            onClick={() => go("/submit-case")}
            className="w-full text-left px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-3"
          >
            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-200 dark:group-hover:bg-teal-600 transition-colors">
            <svg className="w-4 h-4 text-gray-700 dark:text-gray-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
            Submit Case
          </button>

          <button
            onClick={() => go("/my-cases")}
            className="w-full text-left px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-3"
          >
            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-emerald-200 dark:group-hover:bg-teal-600 transition-colors">
            <svg className="w-4 h-4 text-gray-700 dark:text-gray-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
            My Cases
          </button>

          <button
            onClick={() => go("/dashboard")}
            className="w-full text-left px-4 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-3"
          >
            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-teal-200 dark:group-hover:bg-teal-600 transition-colors">
            <svg className="w-4 h-4 text-gray-700 dark:text-gray-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
            </svg>
          </div>
            Overview
          </button>

          {/* Contact Facilitator - prominent red button */}
          <div className="pt-6">
            <button
              onClick={() => {
                const phoneNumber = "+919565188938";
                const userName = user?.name || "Patient";
                const message = encodeURIComponent(
                  `Hello! I'm ${userName} from ShafiMed platform. I need assistance with my medical case.`
                );
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                window.open(whatsappUrl, "_blank");
              }}
              className="w-full text-left px-4 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="p-2 bg-white/20 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.512z"/>
                </svg>
              </div>
              <div>
                <div className="font-semibold">Contact Facilitator</div>
                <div className="text-xs text-red-100">Get instant help</div>
              </div>
            </button>
          </div>
        </nav>

        {/* bottom area: dark mode toggle + logout */}
        <div className="px-4 py-4 border-t dark:border-gray-700 space-y-3">
          <button
            onClick={() => setDarkMode((s) => !s)}
            className="flex items-center w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 gap-3 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span className="font-medium">{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>

        <div className="px-4 py-4 border-t border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 space-y-3"> 
            <BackToHome onBack={() => window.location.href = "/"} /> 

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition flex items-center gap-3"
          >
            <div className="p-1.5 rounded-lg group-hover:bg-red-100 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
            Logout
          </button>
        </div>
    </div>








      </aside>

      {/* -------------- MAIN CONTENT (offset on md) -------------- */}
      <div className="flex-1 min-w-0 flex flex-col md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40  border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/80 backdrop-blur-md border-b shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Mobile menu toggle */}
              <button
                onClick={() => setSidebarOpen((s) => !s)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                aria-label="Open sidebar"
              >
                {/* {sidebarOpen ? <X size={20} /> : <Menu size={20} />} */}
                {sidebarOpen ? (
                    <X size={20} className="text-gray-800 dark:text-gray-100" />
                  ) : (
                    <Menu size={20} className="text-gray-800 dark:text-gray-100" />
                  )}
              </button>

              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Welcome back</div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-gray-50 flex items-center gap-2">
                  {title || user?.name || "Patient"}
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse block" />
                </h1>
              </div>
            </div>

            <div className="flex gap-3">{actions}</div>
          </div>
        </header>

        {/* main */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
          {children}
        </main>

        {/* footer */}
        <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">© 2025 ShafiMed. Your health, our priority.</div>
              <div className="flex items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  System Online
                </span>
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default PatientLayout;

