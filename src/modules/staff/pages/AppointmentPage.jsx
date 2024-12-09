import React from 'react';
import AppointmentScheduling from '../components/AppointmentScheduling';

const AppointmentsPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Manage Appointments</h1>
            <AppointmentScheduling />
        </div>
    );
};

export default AppointmentsPage;

