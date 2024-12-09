import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppointmentForm from '../components/AppointmentForm';
import { getDoctorById } from '../services/patientApi';

const BookAppointmentPage = () => {
    const { doctorId } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    console.log('doctor ID from URL params:', doctorId);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const data = await getDoctorById(doctorId);
                setDoctor(data.doctor);
            } catch (err) {
                setError('Failed to fetch doctor details.');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [doctorId]);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <AppointmentForm doctor={doctor} />
        </div>
    );
};

export default BookAppointmentPage;