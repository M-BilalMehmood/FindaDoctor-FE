import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, AlertTriangle, Activity } from 'lucide-react';
import { getDashboardStats } from '../services/adminApi';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        userCount: 0,
        doctorCount: 0,
        patientCount: 0,
        feedbackCount: 0,
        spamReportCount: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (err) {
                setError('Failed to load dashboard statistics');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const dashboardItems = [
        {
            title: 'User Management',
            description: 'Manage user accounts and permissions',
            icon: Users,
            link: '/admin/users',
            color: 'bg-blue-100 text-blue-600'
        },
        {
            title: 'Feedback Management',
            description: 'Review and moderate user feedback',
            icon: MessageSquare,
            link: '/admin/feedback',
            color: 'bg-green-100 text-green-600'
        },
        {
            title: 'Spam Reports',
            description: 'Handle reported content and users',
            icon: AlertTriangle,
            link: '/admin/spam-reports',
            color: 'bg-red-100 text-red-600'
        }
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Users"
                    value={stats.userCount}
                    icon={Users}
                    color="bg-blue-100 text-blue-600"
                />
                <StatsCard
                    title="Doctors"
                    value={stats.doctorCount}
                    icon={Activity}
                    color="bg-green-100 text-green-600"
                />
                <StatsCard
                    title="Patients"
                    value={stats.patientCount}
                    icon={Users}
                    color="bg-purple-100 text-purple-600"
                />
                <StatsCard
                    title="Pending Reports"
                    value={stats.spamReportCount}
                    icon={AlertTriangle}
                    color="bg-red-100 text-red-600"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardItems.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Link to={item.link} className="block">
                            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className={`p-3 rounded-full mr-4 ${item.color}`}>
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                    </div>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const StatsCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <div className={`p-2 rounded-full ${color}`}>
                <Icon className="w-4 h-4" />
            </div>
        </div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
);

export default AdminDashboard;

