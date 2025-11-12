import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../store/slices/authSlice";

function FacilitatorLayout({ title, actions, children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  }, []);

  const go = (p) => navigate(p);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  const sidebarBtn = "flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-300 hover:text-lg transition";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-gray-50 h-screen border-r-2 shadow-2xl fixed top-0 left-0">
        <div onClick={() => go("/")} className="px-6 py-5 border-b-4 border-teal-400 shadow-xl flex flex-col gap-1 cursor-pointer">
          <div className="text-2xl font-extrabold text-teal-600"> ← ShafiMed</div>
          <div className="text-md font-bold text-gray-900"> Facilitator Workspace</div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-2">
          {/* Dashboard */}
          <div className="space-y-1 border-gray-800 shadow-lg">
            <button onClick={() => go("/facilitator")} className={sidebarBtn}>📊 Dashboard</button>
          </div>

          {/* Cases */}
          <div className="mt-2 border-t border-gray-800 shadow-lg pt-2 space-y-1">
            <button onClick={() => go("/facilitator/cases")} className={sidebarBtn}>📋 All Cases</button>
            <button onClick={() => go("/facilitator/pending")} className={sidebarBtn}>⏳ Pending Cases</button>
            <button onClick={() => go("/facilitator/running-cases")} className={sidebarBtn}>🔍 Assigned Cases</button>
            <button onClick={() => go("/facilitator/inprogress")} className={sidebarBtn}>🚧 In Progress</button>
            <button onClick={() => go("/facilitator/closed")} className={sidebarBtn}>✅ Closed Cases</button>
            <button onClick={() => go("/facilitator/followups")} className={sidebarBtn}>🔁 Follow Ups</button>
            <button onClick={() => go("/facilitator/rejected")} className={sidebarBtn}>❌ Failed Cases</button>
          </div>

          {/* Patients / Departments */}
          <div className="mt-2 border-t border-gray-800 shadow-lg pt-2 space-y-1">
            <button onClick={() => go("/facilitator/patients")} className={sidebarBtn}>🧑‍🤝‍🧑 Patients On Platform</button>
            <button onClick={() => go("/facilitator/quotes")} className={sidebarBtn}>💬 Query Log</button>
            <button onClick={() => go("/facilitator/departments")} className={sidebarBtn}>🏥 Departments</button>
            <button onClick={() => go("/facilitator/case-by-ref")} className={sidebarBtn}>🔍 By Ref ID</button>
          </div>

          {/* Analytics */}
          <div className="mt-2 border-t border-gray-800 shadow-lg ">
            <button onClick={() => go("/facilitator/analytics")} className={sidebarBtn}>📈 Analytics</button>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t-4 flex flex-col gap-3 text-sm text-gray-500 bg-gray-50">
    
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left px-4 py-4 rounded-lg font-medium bg-red-500 text-white hover:bg-red-700 transition"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 ml-64">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-sm shadow-xl border-b-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Facilitator Portal</div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title || "Dashboard"}</h1>
            </div>
            <div className="flex gap-2">{actions}</div>
          </div>
        </header>

        {/* Main area */}
        <main className="max-w-8xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <div className="bg-white rounded-lg shadow p-4">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default FacilitatorLayout;
