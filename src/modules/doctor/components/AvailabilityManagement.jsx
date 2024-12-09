import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash } from 'lucide-react';
import { getDoctorProfile, updateDoctorProfile } from '../services/doctorApi';

const AvailabilityManagement = () => {
    const [availability, setAvailability] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        try {
            const profile = await getDoctorProfile();
            setAvailability(profile.availableHours || []);
        } catch (err) {
            setError('Failed to load availability');
        }
    };

    const addTimeSlot = () => {
        setAvailability([
            ...availability,
            { day: 'Monday', startTime: '09:00', endTime: '17:00' }
        ]);
    };

    const removeTimeSlot = (index) => {
        setAvailability(availability.filter((_, i) => i !== index));
    };

    const updateTimeSlot = (index, field, value) => {
        const updatedAvailability = [...availability];
        updatedAvailability[index] = { 
            ...updatedAvailability[index],
            [field]: value 
        };
        setAvailability(updatedAvailability);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoctorProfile({ availableHours: availability });
        } catch (err) {
            setError('Failed to update availability');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6"
            >
                <h2 className="text-2xl font-bold mb-6">Manage Availability</h2>

                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {availability.map((slot, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center space-x-4"
                        >
                            <select
                                value={slot.day}
                                onChange={(e) => updateTimeSlot(index, 'day', e.target.value)}
                                className="rounded-md border-gray-300"
                            >
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                                    .map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))
                                }
                            </select>
                            <input
                                type="time"
                                value={slot.startTime}
                                onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)}
                                className="rounded-md border-gray-300"
                            />
                            <input
                                type="time"
                                value={slot.endTime}
                                onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
                                className="rounded-md border-gray-300"
                            />
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="button"
                                onClick={() => removeTimeSlot(index)}
                                className="p-2 text-red-500 hover:bg-red-100 rounded-md"
                            >
                                <Trash className="w-4 h-4" />
                            </motion.button>
                        </motion.div>
                    ))}

                    <div className="flex space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={addTimeSlot}
                            className="flex items-center px-4 py-2 bg-gray-100 rounded-md"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Time Slot
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-md"
                        >
                            Save Changes
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AvailabilityManagement;