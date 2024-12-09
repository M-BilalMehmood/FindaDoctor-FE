import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import DoctorHomePage from './pages/DoctorHomePage';
import ProfilePage from './pages/ProfilePage';
import AppointmentsPage from './pages/AppointmentsPage';
import PrescriptionsPage from './pages/PrescriptionsPage';
import PatientsPage from './pages/PatientsPage';
import RoomPage from '../../room/index';

const DoctorRoutes = [
    <Route
        key="doctor-dashboard"
        path="/doctor/dashboard"
        element={
            <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorHomePage />
            </ProtectedRoute>
        }
    />,
    <Route
        key="doctor-profile"
        path="/doctor/profile"
        element={
            <ProtectedRoute allowedRoles={['doctor']}>
                <ProfilePage />
            </ProtectedRoute>
        }
    />,
    <Route
        key="doctor-appointments"
        path="/doctor/appointments"
        element={
            <ProtectedRoute allowedRoles={['doctor']}>
                <AppointmentsPage />
            </ProtectedRoute>
        }
    />,
    <Route
        key="doctor-patients"
        path="/doctor/patients"
        element={
            <ProtectedRoute allowedRoles={['doctor']}>
                <PatientsPage />
            </ProtectedRoute>
        }
    />,
    <Route
        key="doctor-prescriptions"
        path="/doctor/prescriptions"
        element={
            <ProtectedRoute allowedRoles={['doctor']}>
                <PrescriptionsPage />
            </ProtectedRoute>
        }
    />,
    <Route
        key="doctor-video-call"
        path="/doctor/video-call/:appointmentId"
        element={
            <ProtectedRoute allowedRoles={['doctor']}>
                <RoomPage />
            </ProtectedRoute>
        }
    />
];

export default DoctorRoutes;