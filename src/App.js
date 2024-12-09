import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PatientDashboard from "./modules/patient/components/PatientDashboard";
import StaffDashboard from "./modules/staff/components/StaffDashboard";
import DoctorDashboard from "./modules/doctor/components/DoctorDashboard";
import AdminDashboard from "./modules/admin/components/AdminDashboard";
import SuperAdminDashboard from "./modules/superAdmin/components/SuperAdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientRoutes from "./modules/patient/routes";
import StaffRoutes from "./modules/staff/routes";
import DoctorRoutes from "./modules/doctor/routes";
import AdminRoutes from "./modules/admin/routes";
import SuperAdminRoutes from "./modules/superAdmin/routes";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="387294485866-j2617b5scnhbnfqk9ianlpkhgkl63ubj.apps.googleusercontent.com">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/complete-profile" element={<CompleteProfilePage />} />
            <Route
              path="/patient/dashboard"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/dashboard"
              element={
                <ProtectedRoute allowedRoles={["staff"]}>
                  <StaffDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/dashboard"
              element={
                <ProtectedRoute allowedRoles={["doctor"]}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["superAdmin"]}>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              }
            />
            {PatientRoutes}
            {StaffRoutes}
            {DoctorRoutes}
            {AdminRoutes}
            {SuperAdminRoutes}
          </Routes>
        </Layout>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
