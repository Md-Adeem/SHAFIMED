import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import AppNavbar from "./components/AppNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import ShimmerLoader from "./components/ui/ShimmerLoader"; // You already have this!

// ===== Lazy Loaded Pages =====
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./Features/Auth/Login"));
const Signup = lazy(() => import("./Features/Auth/Signup"));
const Logout = lazy(() => import("./Features/Auth/Logout"));
const About = lazy(() => import("./pages/About"));
const Hospitals = lazy(() => import("./pages/Hospitals"));
const ContactPage = lazy(() => import("./pages/Contact"));


const PatientDashboard = lazy(() => import("./Features/Patient/PatientDashboard_Enhanced"));
const CaseDetailsModal = lazy(() => import("./Features/Patient/CaseDetailsModal"));
const SubmitCase = lazy(() => import("./Features/Patient/SubmitCase"));
const MyCases = lazy(() => import("./Features/Patient/MyCases"));
const PatientProfile = lazy(() => import("./Features/Auth/PatientProfile"));


const FacilitatorDashboard = lazy(() => import("./Features/Facilitator/FacilitatorDashboard_Enhanced"));
const AllCases = lazy(() => import("./Features/Facilitator/AllCases"));
const PendingCases = lazy(() => import("./Features/Facilitator/PendingCases"));
const InProgress = lazy(() => import("./Features/Facilitator/InProgress"));
const RunningCases = lazy(() => import("./Features/Facilitator/RunningCases"));
const FollowUps = lazy(() => import("./Features/Facilitator/FollowUps"));
const Failed = lazy(() => import("./Features/Facilitator/Failed"));
const Responded = lazy(() => import("./Features/Facilitator/Responded"));
const Patients = lazy(() => import("./Features/Facilitator/Patients"));
const Departments = lazy(() => import("./Features/Facilitator/Departments"));
const Analytics = lazy(() => import("./Features/Facilitator/Analytics"));
const ViewByRef = lazy(() => import("./Features/Facilitator/ViewByRef"));
const QuotesList = lazy(() => import("./Features/Facilitator/QuotesList"));

function App() {
  const location = useLocation();

  // Hide navbar on dashboard and facilitator pages
  const hideNavbar = [
    "/dashboard",
    "/submit-case",
    "/my-cases",
    "/profile",
    "/facilitator",
  ].some((p) => location.pathname.startsWith(p));

  return (
    <>
      {!hideNavbar && <AppNavbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<ContactPage />} />

        <Route
          path="/case/:id"
          element={
            <ProtectedRoute>
              <CaseDetailsModal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit-case"
          element={
            <ProtectedRoute>
              <SubmitCase />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-cases"
          element={
            <ProtectedRoute>
              <MyCases />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <PatientProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/facilitator"
          element={
            <RoleRoute allow={["facilitator"]}>
              <FacilitatorDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="/facilitator/cases"
          element={
            <RoleRoute allow={["facilitator"]}>
              <AllCases />
            </RoleRoute>
          }
        />
        <Route
          path="/facilitator/pending"
          element={
            <RoleRoute allow={["facilitator"]}>
              <PendingCases />
            </RoleRoute>
          }
        />
        <Route
          path="/facilitator/running-cases"
          element={
            <RoleRoute allow={["facilitator"]}>
              <RunningCases />
            </RoleRoute>
          }
        />
        <Route
          path="/facilitator/inprogress"
          element={
            <RoleRoute allow={["facilitator"]}>
              <InProgress />
            </RoleRoute>
          }
        />
        <Route
          path="/facilitator/followups"
          element={
            <RoleRoute allow={["facilitator"]}>
              <FollowUps />
            </RoleRoute>
          }
        />
        <Route
          path="/facilitator/rejected"
          element={
            <RoleRoute allow={["facilitator"]}>
              <Failed />
            </RoleRoute>
          }
        />
        <Route
          path="/facilitator/closed"
          element={
            <RoleRoute allow={["facilitator"]}>
              <Responded />
            </RoleRoute>
          }
        />
        <Route path="/facilitator" element={<RoleRoute allow={["facilitator"]}><FacilitatorDashboard /></RoleRoute>} />
        <Route path="/facilitator/cases" element={<RoleRoute allow={["facilitator"]}><AllCases /></RoleRoute>} />
        <Route path="/facilitator/pending" element={<RoleRoute allow={["facilitator"]}><PendingCases /></RoleRoute>} />
        <Route path="/facilitator/running-cases" element={<RoleRoute allow={["facilitator"]}><RunningCases /></RoleRoute>} />
        <Route path="/facilitator/inprogress" element={<RoleRoute allow={["facilitator"]}><InProgress /></RoleRoute>} />
        <Route path="/facilitator/followups" element={<RoleRoute allow={["facilitator"]}><FollowUps /></RoleRoute>} />
        {/* <Route path="/facilitator/rejected" element={<RoleRoute allow={["facilitator"]}><Failed /></RoleRoute>} /> */}
        <Route path="/facilitator/closed" element={<RoleRoute allow={["facilitator"]}><Responded /></RoleRoute>} />
        <Route path="/facilitator/quotes" element={<RoleRoute allow={["facilitator"]}><QuotesList /></RoleRoute>} />
        {/* <Route path="/facilitator/test" element={<RoleRoute allow={["facilitator"]}><Test /></RoleRoute>} /> */}
        {/* <Route path="/facilitator/running-cases" element={<RoleRoute allow={["facilitator"]}><RunningCases /></RoleRoute>} /> */}
        <Route
          path="/facilitator/patients"
          element={
            <RoleRoute allow={["facilitator"]}>
              <Patients />
            </RoleRoute>
          }
        />
        <Route
          path="/facilitator/departments"
          element={
            <RoleRoute allow={["facilitator"]}>
              <Departments />
            </RoleRoute>
          }
        />
        {/* <Route path="/facilitator/case-by-ref" element={<RoleRoute allow={["facilitator"]}><ViewByRef /></RoleRoute>} /> */}
        <Route path="/facilitator/case-by-ref" element={<ViewByRef />} />
        <Route
          path="/facilitator/analytics"
          element={
            <RoleRoute allow={["facilitator"]}>
              <Analytics />
            </RoleRoute>
          }
        />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
