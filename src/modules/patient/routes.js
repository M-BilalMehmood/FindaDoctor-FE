import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import PatientHomePage from './pages/PatientHomePage';
import DoctorSearchPage from './pages/DoctorSearchPage';
import MyAppointmentPage from './pages/MyAppointmentPage';
import FeedbackPage from './pages/FeedbackPage';
import MedicalRecordsPage from './pages/MedicalRecordsPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import RoomPage from '../../room/index';

const PatientRoutes = [
    <Route
        key="patient-dashboard"
        path="/patient/dashboard"
        element={
            <ProtectedRoute allowedRoles={['patient']}>
                <PatientHomePage />
            </ProtectedRoute>
        }
    />,
    <Route
        key="patient-search"
        path="/patient/search"
        element={
            <ProtectedRoute allowedRoles={['patient']}>
                <DoctorSearchPage />
            </ProtectedRoute>
        }
    />,
    <Route
        key="patient-appointments"
        path="/patient/appointments"
        element={
            <ProtectedRoute allowedRoles={['patient']}>
                <MyAppointmentPage />
            </ProtectedRoute>
        }
    />,
    <Route
        key="patient-feedback"
        path="/patient/feedback"
        element={
            <ProtectedRoute allowedRoles={['patient']}>
                <FeedbackPage />
            </ProtectedRoute>
        }
    />,
    <Route
        key="patient-records"
        path="/patient/records"
        element={
            <ProtectedRoute allowedRoles={['patient']}>
                <MedicalRecordsPage />
            </ProtectedRoute>
        }
    />,
    <Route
        key="book-appointment"
        path="/patient/book-appointment/:doctorId"
        element={
            <ProtectedRoute allowedRoles={['patient']}>
                <BookAppointmentPage />
            </ProtectedRoute>
        }
    />,
    <Route
        key="patient-video-call"
        path="/patient/video-call/:appointmentId"
        element={
            <ProtectedRoute allowedRoles={['patient']}>
                <RoomPage />
            </ProtectedRoute>
        }
    />
];

export default PatientRoutes;

