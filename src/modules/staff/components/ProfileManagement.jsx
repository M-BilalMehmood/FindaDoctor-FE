import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { updateStaffProfile, getStaffProfile } from '../services/StaffApi';

const ProfileManagement = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        department: '',
        position: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getStaffProfile();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStaffProfile(profile);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
        >
            <h2 className="text-2xl font-bold mb-6">Manage Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                </div>
                <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={profile.department}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                </div>
                <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={profile.position}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                >
                    Update Profile
                </motion.button>
            </form>
        </motion.div>
    );
};

export default ProfileManagement;

