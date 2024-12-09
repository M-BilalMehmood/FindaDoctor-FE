import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, FileText, Calendar } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const StaffDashboard = () => {
    const dashboardItems = [
        { icon: User, title: 'Manage Profile', link: '/staff/profile', color: 'blue-600' },
        { icon: FileText, title: 'Prescriptions', link: '/staff/search-patients', color: 'green-600' },
        { icon: Calendar, title: 'Appointments', link: '/staff/appointments', color: 'purple-600' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">Staff Dashboard</h1>
                    <p className="text-gray-600 mt-2">Manage your tasks and responsibilities</p>
                </header>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {dashboardItems.map((item) => (
                        <motion.div key={item.title} variants={itemVariants}>
                            <Link
                                to={item.link}
                                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center mb-4">
                                    <div className={`bg-${item.color} bg-opacity-10 p-3 rounded-full mr-4`}>
                                        <item.icon className={`w-6 h-6 text-${item.color}`} />
                                    </div>
                                    <h2 className="text-lg font-semibold">{item.title}</h2>
                                </div>
                                <p className="text-gray-600">Click to manage</p>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default StaffDashboard;

