import React from 'react';
import DoctorProfile from '../components/DoctorProfile';
import AvailabilityManagement from '../components/AvailabilityManagement';
import { motion } from 'framer-motion';

const ProfilePage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-8"
            >
                Doctor Profile
            </motion.h1>
            
            <div className="space-y-8">
                <section>
                    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                    <DoctorProfile />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4">Availability Management</h2>
                    <AvailabilityManagement />
                </section>
            </div>
        </div>
    );
};

export default ProfilePage;