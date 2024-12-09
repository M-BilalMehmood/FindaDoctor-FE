import React, { useState, useEffect } from 'react';
import AppointmentList from '../components/AppointmentList';
import { getAppointments } from '../services/patientApi';

const MyAppointmentPage = () => {
    const [appointments, setAppointments] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getAppointments();
                console.log('Fetched Appointments:', data); // Log the fetched data
                setAppointments(data); // Ensure data is an array
            } catch (error) {
                console.error('Error fetching appointments:', error);
                // Handle error (e.g., show error message to user)
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Appointments</h1>
            <AppointmentList appointments={appointments} />
        </div>
    );
};

export default MyAppointmentPage;