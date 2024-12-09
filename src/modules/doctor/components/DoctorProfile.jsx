import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Edit } from 'lucide-react';
import { getDoctorProfile, updateDoctorProfile } from '../services/doctorApi';

const DoctorProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        specialty: '',
        qualifications: [],
        experience: 0,
        PMDCRegistrationNumber: '',
        consultationFee: 0,
        availableHours: []
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await getDoctorProfile();
            setProfile(data);
        } catch (err) {
            setError('Failed to load profile');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoctorProfile(profile);
            setIsEditing(false);
        } catch (err) {
            setError('Failed to update profile');
        }
    };

    const handleAvailabilityChange = (index, field, value) => {
        const updatedHours = [...profile.availableHours];
        updatedHours[index] = { ...updatedHours[index], [field]: value };
        setProfile({ ...profile, availableHours: updatedHours });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Doctor Profile</h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center px-4 py-2 bg-primary text-white rounded-md"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </motion.button>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Specialty
                            </label>
                            <input
                                type="text"
                                value={profile.specialty}
                                onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                                disabled={!isEditing}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Experience (years)
                            </label>
                            <input
                                type="number"
                                value={profile.experience}
                                onChange={(e) => setProfile({ ...profile, experience: parseInt(e.target.value) })}
                                disabled={!isEditing}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Available Hours Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">Available Hours</h3>
                        {profile.availableHours.map((hours, index) => (
                            <div key={index} className="flex space-x-4 mb-4">
                                <select
                                    value={hours.day}
                                    onChange={(e) => handleAvailabilityChange(index, 'day', e.target.value)}
                                    disabled={!isEditing}
                                    className="rounded-md border-gray-300"
                                >
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                                <input
                                    type="time"
                                    value={hours.startTime}
                                    onChange={(e) => handleAvailabilityChange(index, 'startTime', e.target.value)}
                                    disabled={!isEditing}
                                    className="rounded-md border-gray-300"
                                />
                                <input
                                    type="time"
                                    value={hours.endTime}
                                    onChange={(e) => handleAvailabilityChange(index, 'endTime', e.target.value)}
                                    disabled={!isEditing}
                                    className="rounded-md border-gray-300"
                                />
                            </div>
                        ))}
                    </div>

                    {isEditing && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full px-4 py-2 bg-primary text-white rounded-md"
                        >
                            Save Changes
                        </motion.button>
                    )}
                </form>
            </motion.div>
        </div>
    );
};

export default DoctorProfile;