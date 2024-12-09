import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import StaffHomePage from './pages/StaffHomePage';
import ProfilePage from './pages/ProfilePage';
import PatientSearchPage from './pages/PatientSearchPage';
import UploadPrescriptionPage from './pages/UploadPrescriptionPage';
import PrescriptionsPage from './pages/PrescriptionPage';
import AppointmentsPage from './pages/AppointmentPage';

const StaffRoutes = [
    <Route
        key="staff-dashboard"
        path="/staff/dashboard"
        element={
            <ProtectedRoute allowedRoles={['staff']}>
                <StaffHomePage />
            </ProtectedRoute>
        }
    />,
    <Route
        key="staff-patient-search"
        path="/staff/search-patients"
        element={
        <ProtectedRoute allowedRoles={['staff']}>
            <PatientSearchPage />
        </ProtectedRoute>
        }
    />,
    <Route
        key="staff-upload-prescription"
        path="/staff/upload-prescription/:patientId"
        element={
        <ProtectedRoute allowedRoles={['staff']}>
            <UploadPrescriptionPage />
        </ProtectedRoute>
        }
    />,
    <Route
        key="staff-profile"
        path="/staff/profile"
        element={
            <ProtectedRoute allowedRoles={['staff']}>
                <ProfilePage />
            </ProtectedRoute>
        }
    />,
    // <Route
    //     key="staff-prescriptions"
    //     path="/staff/prescriptions"
    //     element={
    //         <ProtectedRoute allowedRoles={['staff']}>
    //             <PrescriptionsPage />
    //         </ProtectedRoute>
    //     }
    // />,
    <Route
        key="staff-appointments"
        path="/staff/appointments"
        element={
            <ProtectedRoute allowedRoles={['staff']}>
                <AppointmentsPage />
            </ProtectedRoute>
        }
    />,
];

export default StaffRoutes;

