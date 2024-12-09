import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Check, X, Video, Loader, ChevronDown } from 'lucide-react';
import { getAppointments, updateAppointment } from '../services/doctorApi';
import { useNavigate } from 'react-router-dom';

const StatusDropdown = ({ appointment, onStatusChange, isUpdating }) => {
    const [isOpen, setIsOpen] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-500';
            case 'Confirmed': return 'bg-blue-500';
            case 'Cancelled': return 'bg-red-500';
            default: return 'bg-yellow-500';
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isUpdating}
                className="flex items-center space-x-2 px-3 py-2 bg-white border rounded-md hover:bg-gray-50"
            >
                <span className={`w-2 h-2 rounded-full ${getStatusColor(appointment.status)}`} />
                <span>{appointment.status}</span>
                <ChevronDown className="w-4 h-4" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg"
                    >
                        <div className="py-1">
                            {['Confirmed', 'Completed', 'Cancelled'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => {
                                        onStatusChange(appointment._id, status);
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    <span className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(status)}`} />
                                    {status}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const AppointmentManagement = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState('upcoming');
    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, [filter]);

    const fetchAppointments = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getAppointments(filter);
            console.log('Fetched appointments:', data);
            setAppointments(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching appointments:', err);
            setError('Failed to load appointments');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (appointmentId, newStatus) => {
        setUpdatingId(appointmentId);
        try {
            setLoading(true);
            await updateAppointment(appointmentId, newStatus);
            await fetchAppointments();
        } catch (err) {
            setError('Failed to update appointment status');
        } finally {
            setUpdatingId(null);
            setLoading(false);
        }
    };

    const handleStartCall = (appointmentId) => {
        navigate(`/doctor/video-call/${appointmentId}`);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-8">
                <Loader className="w-8 h-8 text-primary animate-spin" />
                <p className="mt-4 text-gray-600">Loading appointments...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Appointments</h2>
                <div className="flex space-x-4">
                    {['upcoming', 'past', 'all'].map((option) => (
                        <button
                            key={option}
                            onClick={() => setFilter(option)}
                            className={`px-4 py-2 rounded-md ${
                                filter === option ? 'bg-primary text-white' : 'bg-gray-100'
                            }`}
                        >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {appointments.map((appointment) => (
                <motion.div
                    key={appointment._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border bg-white rounded-lg p-4 mb-4"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            {/* Existing appointment details */}
                            <div className="flex items-center space-x-4 mb-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span>{new Date(appointment.dateTime).toLocaleDateString()}</span>
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span>{new Date(appointment.dateTime).toLocaleTimeString()}</span>
                            </div>
                            <h3 className="font-medium">{appointment.patient.name}</h3>
                            <p className="text-sm text-gray-500">{appointment.issues}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <StatusDropdown
                                appointment={appointment}
                                onStatusChange={handleStatusUpdate}
                                isUpdating={updatingId === appointment._id}
                            />
                            
                            {appointment.status === 'Confirmed' && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate(`/doctor/video-call/${appointment._id}`)}
                                    className="flex items-center px-4 py-2 bg-primary text-white rounded-md"
                                >
                                    <Video className="w-4 h-4 mr-2" />
                                    Start Meeting
                                </motion.button>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default AppointmentManagement;