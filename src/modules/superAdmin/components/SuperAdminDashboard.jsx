import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, UserCheck, UserX, ShieldCheck } from 'lucide-react';
import { getDashboardStats } from '../services/superAdminApi';

const SuperAdminDashboard = () => {
    const [stats, setStats] = useState({
        userCount: 0,
        doctorCount: 0,
        patientCount: 0,
        adminCount: 0
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    const dashboardItems = [
        {
            title: 'User Management',
            description: 'Authorize and manage user accounts',
            icon: Users,
            link: '/superadmin/users',
            color: 'bg-blue-100 text-blue-600'
        },
        {
            title: 'Banned Users',
            description: 'View and manage banned accounts',
            icon: UserX,
            link: '/superadmin/banned-users',
            color: 'bg-red-100 text-red-600'
        }
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Super Admin Dashboard</h1>
            
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
                    icon={UserCheck}
                    color="bg-green-100 text-green-600"
                />
                <StatsCard
                    title="Patients"
                    value={stats.patientCount}
                    icon={Users}
                    color="bg-purple-100 text-purple-600"
                />
                <StatsCard
                    title="Admins"
                    value={stats.adminCount}
                    icon={ShieldCheck}
                    color="bg-yellow-100 text-yellow-600"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dashboardItems.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link
                            to={item.link}
                            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center mb-4">
                                <div className={`${item.color} p-3 rounded-full mr-4`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">{item.title}</h2>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
        </div>
    );
};

const StatsCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <div className={`p-2 rounded-full ${color}`}>
                <Icon className="w-4 h-4" />
            </div>
        </div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
);

export default SuperAdminDashboard;