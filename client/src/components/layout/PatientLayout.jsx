import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function PatientLayout({ title, actions, children }) {
  const navigate = useNavigate();
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  }, []);

  const go = (p) => navigate(p);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden md:flex w-64 flex-col border-r bg-white">
        <div className="px-6 py-5 border-b">
          <div className="text-2xl font-extrabold text-cyan-700">ShafiMed</div>
          <div className="text-xs text-gray-500 mt-1">Patient Workspace</div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <button onClick={() => go("/dashboard")} className="w-full text-left px-3 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100">Overview</button>
          <button onClick={() => go("/my-cases")} className="w-full text-left px-3 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100">My Cases</button>
          <button onClick={() => go("/submit-case")} className="w-full text-left px-3 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100">Submit Case</button>
          <button onClick={() => go("/profile")} className="w-full text-left px-3 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100">Profile</button>
          
          {/* Contact Facilitator Button */}
          <div className="pt-4">
            <button 
              onClick={() => {
                // Replace with your actual facilitator's WhatsApp number (with country code, no + or spaces)
                const phoneNumber = "1234567890"; // Example: "923001234567" for Pakistan
                const userName = user?.name || "Patient";
                const message = encodeURIComponent(
                  `Hello! I'm ${userName} from ShafiMed platform. I need assistance with my medical case. Please help me.`
                );
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="w-full text-left px-3 py-3 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 flex items-center gap-2 shadow-md"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.512z"/>
              </svg>
              Contact Our Facilitator
            </button>
          </div>
        </nav>
        <div className="px-3 py-4 border-t">
          <button onClick={() => go("/logout")} className="w-full text-left px-3 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50">Logout</button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">Welcome back</div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">{title || user?.name || "Patient"}</h1>
            </div>
            <div className="flex gap-2">{actions}</div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">{children}</main>
      </div>
    </div>
  );
}

export default PatientLayout;

