

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./Features/Auth/Login";
import Signup from "./Features/Auth/Signup";
import Logout from "./Features/Auth/Logout"
import PatientDashboard from "./Features/Patient/PatientDashboard";
import CaseDetailsModal from "./Features/Patient/CaseDetailsModal";
import SubmitCase from "./Features/Patient/SubmitCase";
import MyCases from "./Features/Patient/MyCases";
import PatientProfile from "./Features/Auth/PatientProfile";
// import ProtectedRoute from "./ProtectedRoute";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        
        <Route path="/case/:id" element={<CaseDetailsModal />} />
        <Route path="/submit-case" element={<SubmitCase />} />
           <Route path="/my-cases" element={<MyCases />} />
        <Route path="/profile" element={<PatientProfile />} />
      </Routes>
    </>
  );
}

export default App;
