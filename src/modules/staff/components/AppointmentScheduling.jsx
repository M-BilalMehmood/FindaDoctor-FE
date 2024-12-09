import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Loader } from 'lucide-react';
import { getPendingAppointments, scheduleAppointment } from '../services/StaffApi';

const AppointmentScheduling = () => {
    const [pendingAppointments, setPendingAppointments] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [schedulingId, setSchedulingId] = useState(null); // Track which appointment is being scheduled
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPendingAppointments();
    }, []);

    const fetchPendingAppointments = async () => {
        setLoading(true);
        setError(null);
        try {
            const appointments = await getPendingAppointments();
            setPendingAppointments(Array.isArray(appointments) ? appointments : []);
        } catch (error) {
            console.error('Error fetching pending appointments:', error);
            setError('Failed to load pending appointments.');
        } finally {
            setLoading(false);
        }
    };

    const handleSchedule = async (appointmentId, slot) => {
        if (!slot) return;
        
        setSchedulingId(appointmentId);
        try {
            await scheduleAppointment(appointmentId, slot);
            fetchPendingAppointments();
            alert('Appointment scheduled successfully');
        } catch (error) {
            console.error('Error scheduling appointment:', error);
            alert('Failed to schedule appointment');
        } finally {
            setSchedulingId(null);
        }
    };

    const getAvailableSlots = async (doctorId, date) => {
        setAvailableSlots([
            '09:00 AM',
            '10:00 AM',
            '11:00 AM',
            '02:00 PM',
            '03:00 PM',
            '04:00 PM',
        ]);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <Loader className="w-8 h-8 text-primary animate-spin" />
                <p className="mt-4 text-gray-600">Loading pending appointments...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {pendingAppointments.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                    No pending appointments.
                </div>
            ) : (
                pendingAppointments.map((appointment) => (
                    <motion.div
                        key={appointment._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-6 rounded-lg shadow-md"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">
                                Appointment of {appointment.patient.name}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                appointment.status === 'Pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                            }`}>
                                {appointment.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                                <span>{new Date(appointment.dateTime).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-gray-500" />
                                <span>{new Date(appointment.dateTime).toLocaleTimeString()}</span>
                            </div>
                            <div className="flex items-center">
                                <User className="w-5 h-5 mr-2 text-gray-500" />
                                <span>Dr. {appointment.doctor.name}</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label htmlFor={`slot-${appointment._id}`} className="block text-sm font-medium text-gray-700 mb-2">
                                Select Available Slot
                            </label>
                            <div className="flex space-x-4">
                                <select
                                    id={`slot-${appointment._id}`}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                    onChange={(e) => handleSchedule(appointment._id, e.target.value)}
                                    defaultValue=""
                                    disabled={schedulingId === appointment._id}
                                >
                                    <option value="" disabled>Choose a time slot</option>
                                    {availableSlots.map((slot, index) => (
                                        <option key={`${slot}-${index}`} value={slot}>
                                            {slot}
                                        </option>
                                    ))}
                                </select>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => getAvailableSlots(appointment.doctor._id, appointment.dateTime)}
                                    className={`px-4 py-2 rounded-md flex items-center justify-center min-w-[150px] ${
                                        schedulingId === appointment._id
                                            ? 'bg-gray-200 cursor-not-allowed'
                                            : 'bg-primary text-white hover:bg-primary-dark'
                                    }`}
                                    disabled={schedulingId === appointment._id}
                                >
                                    {schedulingId === appointment._id ? (
                                        <>
                                            <Loader className="w-4 h-4 mr-2 animate-spin" />
                                            Scheduling...
                                        </>
                                    ) : (
                                        'Get Available Slots'
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))
            )}
        </div>
    );
};

export default AppointmentScheduling;