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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden md:flex w-64 flex-col border-r bg-white">
        <div className="px-6 py-5 border-b">
          <div className="text-2xl font-extrabold text-teal-700">ShafiMed</div>
          <div className="text-xs text-gray-500 mt-1">Facilitator Workspace</div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <button 
            onClick={() => go("/facilitator")} 
            className="w-full text-left px-3 py-2 rounded-lg font-medium text-gray-600 hover:bg-teal-100 hover:text-teal-700"
          >
            📊 Dashboard
          </button>
          <button 
            onClick={() => go("/facilitator/cases")} 
            className="w-full text-left px-3 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100"
          >
            📋 All Cases
          </button>
          <button 
            onClick={() => go("/facilitator/pending")} 
            className="w-full text-left px-3 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100"
          >
            ⏳ Pending Cases
          </button>
          <button 
            onClick={() => go("/facilitator/assigned")} 
            className="w-full text-left px-3 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100"
          >
            👨‍⚕️ Assigned Cases
          </button>
          <button 
            onClick={() => go("/facilitator/doctors")} 
            className="w-full text-left px-3 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100"
          >
            👩‍⚕️ Doctors
          </button>
          <button 
            onClick={() => go("/facilitator/analytics")} 
            className="w-full text-left px-3 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100"
          >
            📈 Analytics
          </button>
        </nav>
        <div className="px-3 py-4 border-t">
          <div className="px-3 py-2 text-xs text-gray-500">
            Logged in as: <span className="font-medium text-gray-700">{user?.name}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">Facilitator Portal</div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">{title || "Dashboard"}</h1>
            </div>
            <div className="flex gap-2">{actions}</div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">{children}</main>
      </div>
    </div>
  );
}

export default FacilitatorLayout;

