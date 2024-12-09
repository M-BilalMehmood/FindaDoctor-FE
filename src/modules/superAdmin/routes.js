import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import SuperAdminHomePage from "./pages/SuperAdminHomePage";
import UserManagementPage from "./pages/UserManagementPage";
import BannedUsersPage from "./pages/BannedUsersPage";

const SuperAdminRoutes = [
  <Route
    key="superadmin-dashboard"
    path="/superadmin/dashboard"
    element={
      <ProtectedRoute allowedRoles={["superAdmin"]}>
        <SuperAdminHomePage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="superadmin-users"
    path="/superadmin/users"
    element={
      <ProtectedRoute allowedRoles={["superAdmin"]}>
        <UserManagementPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="superadmin-banned"
    path="/superadmin/banned-users"
    element={
      <ProtectedRoute allowedRoles={["superAdmin"]}>
        <BannedUsersPage />
      </ProtectedRoute>
    }
  />,
];

export default SuperAdminRoutes;
