import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminHomePage from './pages/AdminHomePage';
import FeedbackPage from './pages/FeedbackPage';
import SpamReportPage from './pages/SpamReportPage';
import UsersPage from './pages/UsersPage';

const AdminRoutes = [
    <Route
        key="admin-dashboard"
        path="/admin/dashboard"
        element={
            <ProtectedRoute allowedRoles={['admin']}>
                <AdminHomePage />
            </ProtectedRoute>
        }
    />,
    <Route
        key="admin-feedback"
        path="/admin/feedback"
        element={
            <ProtectedRoute allowedRoles={['admin']}>
                <FeedbackPage />
            </ProtectedRoute>
        }
    />,
    <Route
        key="admin-spam-reports"
        path="/admin/spam-reports"
        element={
            <ProtectedRoute allowedRoles={['admin']}>
                <SpamReportPage />
            </ProtectedRoute>
        }
    />,
    <Route
        key="admin-users"
        path="/admin/users"
        element={
            <ProtectedRoute allowedRoles={['admin']}>
                <UsersPage />
            </ProtectedRoute>
        }
    />
];

export default AdminRoutes;