
// import { useMemo, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout as logoutAction } from "../../store/slices/authSlice";
// import { Sun, Moon, Menu } from "lucide-react";

// function FacilitatorLayout({ title, actions, children }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // ✅ Load dark mode from localStorage (so it persists)
//   const [darkMode, setDarkMode] = useState(() => {
//     return localStorage.getItem("theme") === "dark";
//   });

//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const user = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user") || "null");
//     } catch {
//       return null;
//     }
//   }, []);

//   // ✅ Apply dark mode on mount & whenever toggled
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [darkMode]);

//   const go = (p) => {
//     navigate(p);
//     setSidebarOpen(false);
//   };

//   const handleLogout = () => {
//     dispatch(logoutAction());
//     navigate("/login");
//   };

//   const sidebarBtn =
//     "flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition";

//   return (
//     <div className={`min-h-screen flex bg-gray-50 dark:bg-gray-900`}>
//       {/* Sidebar Overlay for Mobile */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 md:hidden z-40"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed z-50 top-0 left-0 h-screen w-64 bg-gray-50 dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out border-r dark:border-gray-700
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
//       >
//         <div
//           onClick={() => go("/")}
//           className="px-6 py-5 border-b border-teal-500 shadow flex flex-col gap-1 cursor-pointer"
//         >
//           <div className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">
//             ← ShafiMed
//           </div>
//           <div className="text-md font-bold text-gray-900 dark:text-gray-200">
//             Facilitator Workspace
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
//           <button onClick={() => go("/facilitator")} className={sidebarBtn}>📊 Dashboard</button>
//           <button onClick={() => go("/facilitator/cases")} className={sidebarBtn}>📋 All Cases</button>
//           <button onClick={() => go("/facilitator/pending")} className={sidebarBtn}>⏳ Pending Cases</button>
//           <button onClick={() => go("/facilitator/running-cases")} className={sidebarBtn}>🔍 Assigned Cases</button>
//           <button onClick={() => go("/facilitator/inprogress")} className={sidebarBtn}>🚧 In Progress</button>
//           <button onClick={() => go("/facilitator/followups")} className={sidebarBtn}>🔁 Follow Ups</button>
//           <button onClick={() => go("/facilitator/closed")} className={sidebarBtn}>✅ Closed Cases</button>
//           <button onClick={() => go("/facilitator/rejected")} className={sidebarBtn}>❌ Failed Cases</button>
//           <button onClick={() => go("/facilitator/patients")} className={sidebarBtn}>🧑‍🤝‍🧑 Patients</button>
//           <button onClick={() => go("/facilitator/quotes")} className={sidebarBtn}>💬 Query Log</button>
//           <button onClick={() => go("/facilitator/departments")} className={sidebarBtn}>🏥 Departments</button>
//           <button onClick={() => go("/facilitator/analytics")} className={sidebarBtn}>📈 Analytics</button>
//         </nav>

//         {/* Footer */}
//         <div className="p-4 border-t dark:border-gray-700 flex flex-col gap-3">
//           <button
//             onClick={handleLogout}
//             className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//           >
//             🚪 Logout
//           </button>

//           {/* ✅ Dark Mode Toggle (Persistent) */}
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center gap-2"
//           >
//             {darkMode ? <Sun size={18} /> : <Moon size={18} />}
//             {darkMode ? "Light Mode" : "Dark Mode"}
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 min-w-0 md:ml-64">
//         <header className="sticky top-0 z-30 bg-white/70 dark:bg-gray-800/80 backdrop-blur-sm border-b shadow-sm">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <button
//                 className="md:hidden text-gray-700 dark:text-gray-200"
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//               >
//                 <Menu size={24} />
//               </button>
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
//                   Facilitator Portal
//                 </p>
//                 <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
//                   {title || "Dashboard"}
//                 </h1>
//               </div>
//             </div>
//             <div className="flex gap-2">{actions}</div>
//           </div>
//         </header>

//         <main className="max-w-8xl mx-auto px-4 sm:px-6 py-6 space-y-6">
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 overflow-x-auto">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default FacilitatorLayout;



















import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../store/slices/authSlice";
import { Sun, Moon } from "lucide-react";

function FacilitatorLayout({ title, actions, children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Persistent Dark Mode
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const go = (p) => { navigate(p); setSidebarOpen(false); };
  const handleLogout = () => { dispatch(logoutAction()); navigate("/login"); };

  const sidebarBtn =
    "flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition";

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* ===== Desktop Sidebar ===== */}
      <aside className="hidden md:flex w-64 flex-col bg-gray-50 dark:bg-gray-800 h-screen border-r-2 dark:border-gray-700 shadow-2xl fixed top-0 left-0 z-40">
        <div onClick={() => go("/")} className="px-6 py-5 border-b-4 border-teal-400 shadow-xl flex flex-col gap-1 cursor-pointer">
          <div className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">← ShafiMed</div>
          <div className="text-md font-bold text-gray-900 dark:text-gray-200">Facilitator Workspace</div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          {/* Dashboard */}
          <div className="space-y-1 border-gray-800 dark:border-gray-600 shadow-lg rounded-lg p-1">
            <button onClick={() => go("/facilitator")} className={sidebarBtn}>📊 Dashboard</button>
          </div>

          {/* Cases */}
          <div className="mt-2 border-t border-gray-800 dark:border-gray-600 shadow-lg pt-2 space-y-1 rounded-lg p-1">
            <button onClick={() => go("/facilitator/cases")} className={sidebarBtn}>📋 All Cases</button>
            <button onClick={() => go("/facilitator/pending")} className={sidebarBtn}>⏳ Pending Cases</button>
            <button onClick={() => go("/facilitator/running-cases")} className={sidebarBtn}>🔍 Assigned Cases</button>
            <button onClick={() => go("/facilitator/inprogress")} className={sidebarBtn}>🚧 In Progress</button>
            <button onClick={() => go("/facilitator/followups")} className={sidebarBtn}>🔁 Follow Ups</button>
            <button onClick={() => go("/facilitator/closed")} className={sidebarBtn}>✅ Closed Cases</button>
            <button onClick={() => go("/facilitator/rejected")} className={sidebarBtn}>❌ Failed Cases</button>
          </div>

          {/* Patients / Departments */}
          <div className="mt-2 border-t border-gray-800 dark:border-gray-600 shadow-lg pt-2 space-y-1 rounded-lg p-1">
            <button onClick={() => go("/facilitator/patients")} className={sidebarBtn}>🧑‍🤝‍🧑 Patients On Platform</button>
            <button onClick={() => go("/facilitator/quotes")} className={sidebarBtn}>💬 Query Log</button>
            <button onClick={() => go("/facilitator/departments")} className={sidebarBtn}>🏥 Departments</button>
            <button onClick={() => go("/facilitator/case-by-ref")} className={sidebarBtn}>🔍 By Ref ID</button>
          </div>

          {/* Analytics */}
          <div className="mt-2 border-t border-gray-800 dark:border-gray-600 shadow-lg rounded-lg p-1">
            <button onClick={() => go("/facilitator/analytics")} className={sidebarBtn}>📈 Analytics</button>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t-4 dark:border-gray-700 flex flex-col gap-3 text-sm bg-gray-50 dark:bg-gray-800">
          <button onClick={handleLogout} className="w-full px-4 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition">🚪 Logout</button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </aside>

      {/* ===== Mobile Overlay ===== */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ===== Mobile Drawer ===== */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800 border-r dark:border-gray-700 shadow-lg transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div onClick={() => go("/")} className="px-6 py-5 border-b-4 border-teal-400 shadow-xl flex flex-col gap-1 cursor-pointer">
          <div className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">← ShafiMed</div>
          <div className="text-md font-bold text-gray-900 dark:text-gray-200">Facilitator Workspace</div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <button onClick={() => go("/facilitator")} className={sidebarBtn}>📊 Dashboard</button>
          <button onClick={() => go("/facilitator/cases")} className={sidebarBtn}>📋 All Cases</button>
          <button onClick={() => go("/facilitator/pending")} className={sidebarBtn}>⏳ Pending Cases</button>
          <button onClick={() => go("/facilitator/running-cases")} className={sidebarBtn}>🔍 Assigned Cases</button>
          <button onClick={() => go("/facilitator/inprogress")} className={sidebarBtn}>🚧 In Progress</button>
          <button onClick={() => go("/facilitator/followups")} className={sidebarBtn}>🔁 Follow Ups</button>
          <button onClick={() => go("/facilitator/closed")} className={sidebarBtn}>✅ Closed Cases</button>
          <button onClick={() => go("/facilitator/rejected")} className={sidebarBtn}>❌ Failed Cases</button>
          <button onClick={() => go("/facilitator/patients")} className={sidebarBtn}>🧑‍🤝‍🧑 Patients On Platform</button>
          <button onClick={() => go("/facilitator/quotes")} className={sidebarBtn}>💬 Query Log</button>
          <button onClick={() => go("/facilitator/departments")} className={sidebarBtn}>🏥 Departments</button>
          <button onClick={() => go("/facilitator/case-by-ref")} className={sidebarBtn}>🔍 By Ref ID</button>
          <button onClick={() => go("/facilitator/analytics")} className={sidebarBtn}>📈 Analytics</button>

          {/* Mobile footer actions */}
          <div className="pt-3 space-y-2">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
            >
              🚪 Logout
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <div className="flex-1 min-w-0 md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md border-b dark:border-gray-700">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-md border dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ☰
              </button>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Facilitator Portal
                </div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {title || "Dashboard"}
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">{actions}</div>
          </div>
        </header>

        {/* Content wrapper */}
        <main className="w-full px-3 sm:px-6 py-6 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 overflow-x-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default FacilitatorLayout;
