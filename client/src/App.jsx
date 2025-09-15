import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./Features/Auth/Login";
import Signup from "./Features/Auth/Signup";
import Logout from "./Features/Auth/Logout";
import PatientDashboard from "./Features/Patient/PatientDashboard_Enhanced";
import CaseDetailsModal from "./Features/Patient/CaseDetailsModal";
import SubmitCase from "./Features/Patient/SubmitCase";
import MyCases from "./Features/Patient/MyCases";
import PatientProfile from "./Features/Auth/PatientProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import FacilitatorDashboard from "./Features/Facilitator/FacilitatorDashboard_Enhanced";


function App() {
  const location = useLocation();
  const hideNavbar = [
    "/dashboard",
    "/submit-case",
    "/my-cases",
    "/profile",
    "/facilitator",
  ].some((p) => location.pathname.startsWith(p));

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
        
        <Route path="/case/:id" element={<ProtectedRoute><CaseDetailsModal /></ProtectedRoute>} />
        <Route path="/submit-case" element={<ProtectedRoute><SubmitCase /></ProtectedRoute>} />
        <Route path="/my-cases" element={<ProtectedRoute><MyCases /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><PatientProfile /></ProtectedRoute>} />

        <Route path="/facilitator" element={<RoleRoute allow={["facilitator"]}><FacilitatorDashboard /></RoleRoute>} />
      </Routes>
    </>
  );
}

export default App;
