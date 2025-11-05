
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../store/slices/authSlice";

function FacilitatorLayout({ title, actions, children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  const go = (p) => {
    navigate(p);
    setSidebarOpen(false); // Close sidebar on navigation (mobile)
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  const sidebarBtn =
    "flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-300 hover:text-lg transition";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col bg-gray-50 h-screen border-r-2 shadow-2xl fixed top-0 left-0 z-40">
        <div
          onClick={() => go("/")}
          className="px-6 py-5 border-b-4 border-teal-400 shadow-xl flex flex-col gap-1 cursor-pointer"
        >
          <div className="text-2xl font-extrabold text-teal-600">← ShafiMed</div>
          <div className="text-md font-bold text-gray-900">
            Facilitator Workspace
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          {/* Dashboard */}
          <div className="space-y-1 border-gray-800 shadow-lg">
            <button onClick={() => go("/facilitator")} className={sidebarBtn}>
              📊 Dashboard
            </button>
          </div>

          {/* Cases */}
          <div className="mt-2 border-t border-gray-800 shadow-lg pt-2 space-y-1">
            <button onClick={() => go("/facilitator/cases")} className={sidebarBtn}>
              📋 All Cases
            </button>
            <button onClick={() => go("/facilitator/pending")} className={sidebarBtn}>
              ⏳ Pending Cases
            </button>
            <button onClick={() => go("/facilitator/running-cases")} className={sidebarBtn}>
              🔍 Assigned Cases
            </button>
            <button onClick={() => go("/facilitator/inprogress")} className={sidebarBtn}>
              🚧 In Progress
            </button>
            <button onClick={() => go("/facilitator/followups")} className={sidebarBtn}>
              🔁 Follow Ups
            </button>
            <button onClick={() => go("/facilitator/closed")} className={sidebarBtn}>
              ✅ Closed Cases
            </button>
            <button onClick={() => go("/facilitator/rejected")} className={sidebarBtn}>
              ❌ Failed Cases
            </button>
          </div>

          {/* Patients / Departments */}
          <div className="mt-2 border-t border-gray-800 shadow-lg pt-2 space-y-1">
            <button onClick={() => go("/facilitator/patients")} className={sidebarBtn}>
              🧑‍🤝‍🧑 Patients On Platform
            </button>
            <button onClick={() => go("/facilitator/quotes")} className={sidebarBtn}>
              💬 Query Log
            </button>
            <button onClick={() => go("/facilitator/departments")} className={sidebarBtn}>
              🏥 Departments
            </button>
            <button onClick={() => go("/facilitator/case-by-ref")} className={sidebarBtn}>
              🔍 By Ref ID
            </button>
          </div>

          {/* Analytics */}
          <div className="mt-2 border-t border-gray-800 shadow-lg">
            <button onClick={() => go("/facilitator/analytics")} className={sidebarBtn}>
              📈 Analytics
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t-4 flex flex-col gap-3 text-sm text-gray-500 bg-gray-50">
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left px-4 py-4 rounded-lg font-medium bg-red-500 text-white hover:bg-red-700 transition"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Sidebar Overlay (for Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Mobile Drawer) */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 border-r shadow-lg transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          onClick={() => go("/")}
          className="px-6 py-5 border-b-4 border-teal-400 shadow-xl flex flex-col gap-1 cursor-pointer"
        >
          <div className="text-2xl font-extrabold text-teal-600">← ShafiMed</div>
          <div className="text-md font-bold text-gray-900">
            Facilitator Workspace
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {/* Dashboard */}
          <button onClick={() => go("/facilitator")} className={sidebarBtn}>
            📊 Dashboard
          </button>

          {/* Cases */}
          <button onClick={() => go("/facilitator/cases")} className={sidebarBtn}>
            📋 All Cases
          </button>
          <button onClick={() => go("/facilitator/pending")} className={sidebarBtn}>
            ⏳ Pending Cases
          </button>
          <button onClick={() => go("/facilitator/running-cases")} className={sidebarBtn}>
            🔍 Assigned Cases
          </button>
          <button onClick={() => go("/facilitator/inprogress")} className={sidebarBtn}>
            🚧 In Progress
          </button>
          <button onClick={() => go("/facilitator/followups")} className={sidebarBtn}>
            🔁 Follow Ups
          </button>
          <button onClick={() => go("/facilitator/closed")} className={sidebarBtn}>
            ✅ Closed Cases
          </button>
          <button onClick={() => go("/facilitator/rejected")} className={sidebarBtn}>
            ❌ Failed Cases
          </button>

          {/* Other Pages */}
          <button onClick={() => go("/facilitator/patients")} className={sidebarBtn}>
            🧑‍🤝‍🧑 Patients On Platform
          </button>
          <button onClick={() => go("/facilitator/quotes")} className={sidebarBtn}>
            💬 Query Log
          </button>
          <button onClick={() => go("/facilitator/departments")} className={sidebarBtn}>
            🏥 Departments
          </button>
          <button onClick={() => go("/facilitator/case-by-ref")} className={sidebarBtn}>
            🔍 By Ref ID
          </button>
          <button onClick={() => go("/facilitator/analytics")} className={sidebarBtn}>
            📈 Analytics
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm shadow-md border-b">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-md border text-gray-700 hover:bg-gray-100"
              >
                ☰
              </button>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Facilitator Portal
                </div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                  {title || "Dashboard"}
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">{actions}</div>
          </div>
        </header>

        {/* Main area */}
        <main className="w-full px-3 sm:px-6 py-6 space-y-6">
          <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default FacilitatorLayout;

