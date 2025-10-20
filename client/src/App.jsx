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

import AllCases from "./Features/Facilitator/AllCases";
import PendingCases from "./Features/Facilitator/PendingCases";
import InProgress from "./Features/Facilitator/InProgress";
import FollowUps from "./Features/Facilitator/FollowUps";
import Patients from "./Features/Facilitator/Patients";
import Departments from "./Features/Facilitator/Departments";
import Analytics from "./Features/Facilitator/Analytics";
import ViewByRef from "./Features/Facilitator/ViewByRef";
import { Toaster } from "react-hot-toast";
import RunningCases from "./Features/Facilitator/RunningCases";
import Responded from "./Features/Facilitator/Responded";
import Failed from "./Features/Facilitator/Failed";
import About from "./pages/About";
// import Test from "./Features/Facilitator/Test";
// import Running from "./Features/Facilitator/";
// import RunningCases from "./Features/Facilitator/";
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
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
        
        <Route path="/case/:id" element={<ProtectedRoute><CaseDetailsModal /></ProtectedRoute>} />
        <Route path="/submit-case" element={<ProtectedRoute><SubmitCase /></ProtectedRoute>} />
        <Route path="/my-cases" element={<ProtectedRoute><MyCases /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><PatientProfile /></ProtectedRoute>} />

        <Route path="/facilitator" element={<RoleRoute allow={["facilitator"]}><FacilitatorDashboard /></RoleRoute>} />
        <Route path="/facilitator/cases" element={<RoleRoute allow={["facilitator"]}><AllCases /></RoleRoute>} />
        <Route path="/facilitator/pending" element={<RoleRoute allow={["facilitator"]}><PendingCases /></RoleRoute>} />
        <Route path="/facilitator/running-cases" element={<RoleRoute allow={["facilitator"]}><RunningCases /></RoleRoute>} />
        <Route path="/facilitator/inprogress" element={<RoleRoute allow={["facilitator"]}><InProgress /></RoleRoute>} />
        <Route path="/facilitator/followups" element={<RoleRoute allow={["facilitator"]}><FollowUps /></RoleRoute>} />
        <Route path="/facilitator/rejected" element={<RoleRoute allow={["facilitator"]}><Failed /></RoleRoute>} />
        <Route path="/facilitator/closed" element={<RoleRoute allow={["facilitator"]}><Responded /></RoleRoute>} />
        {/* <Route path="/facilitator/test" element={<RoleRoute allow={["facilitator"]}><Test /></RoleRoute>} /> */}
        {/* <Route path="/facilitator/running-cases" element={<RoleRoute allow={["facilitator"]}><RunningCases /></RoleRoute>} /> */}
        <Route path="/facilitator/patients" element={<RoleRoute allow={["facilitator"]}><Patients /></RoleRoute>} />
        <Route path="/facilitator/departments" element={<RoleRoute allow={["facilitator"]}><Departments /></RoleRoute>} />
        {/* <Route path="/facilitator/case-by-ref" element={<RoleRoute allow={["facilitator"]}><ViewByRef /></RoleRoute>} /> */}
        <Route path="/facilitator/case-by-ref" element={<ViewByRef />} />
        <Route path="/facilitator/analytics" element={<RoleRoute allow={["facilitator"]}><Analytics /></RoleRoute>} />
      </Routes>
       <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
