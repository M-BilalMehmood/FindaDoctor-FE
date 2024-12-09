import React, { useState } from 'react';
import AppointmentManagement from '../components/AppointmentManagement';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

const AppointmentsPage = () => {
    const [view, setView] = useState('calendar'); // 'calendar' or 'list'

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold mb-4"
                >
                    Manage Appointments
                </motion.h1>
            </div>

            <AppointmentManagement view={view} />
        </div>
    );
};

export default AppointmentsPage;