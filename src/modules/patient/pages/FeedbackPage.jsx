import React, { useState, useEffect } from 'react';
import Feedback from '../components/Feedback';
import { getAppointments, submitFeedback } from '../services/patientApi';

const FeedbackPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getAppointments();
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
                setErrorMessage('Error fetching appointments');
            }
        };

        fetchAppointments();
    }, []);

    const handleSubmitFeedback = async (feedbackData) => {
        try {
            await submitFeedback(feedbackData);
            setSuccessMessage('Feedback submitted successfully');
            setSelectedAppointment(null); // Clear the selected appointment after submission
            //clear the success message after 5 sec
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setErrorMessage('Error submitting feedback');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Provide Feedback</h1>
            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                    {errorMessage}
                </div>
            )}
            {appointments.length > 0 ? (
                <div>
                    <select
                        value={selectedAppointment ? selectedAppointment._id : ''}
                        onChange={(e) => {
                            const appointment = appointments.find(app => app._id === e.target.value);
                            setSelectedAppointment(appointment);
                        }}
                        className="mb-4 p-2 border border-gray-300 rounded-md"
                    >
                        <option value="" disabled>Select an appointment</option>
                        {appointments.map((appointment) => (
                            <option key={appointment._id} value={appointment._id}>
                                Appointment with Dr. {appointment.doctor.name} on {new Date(appointment.dateTime).toLocaleString()}
                            </option>
                        ))}
                    </select>
                    {selectedAppointment && (
                        <Feedback appointment={selectedAppointment} onSubmit={handleSubmitFeedback} />
                    )}
                </div>
            ) : (
                <div>No appointments available for feedback.</div>
            )}
        </div>
    );
};

export default FeedbackPage;