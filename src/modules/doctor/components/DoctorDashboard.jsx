import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, FileText, Settings } from 'lucide-react';
import { DashboardCard } from '../../dashboard/DashboardCard';
import { StatsCard } from '../../dashboard/StatsCard';
import { getDoctorStats } from '../services/doctorApi';

const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const DoctorDashboard = () => {
  const [stats, setStats] = useState({
    appointments: { value: 0, trend: 0 },
    patients: { value: 0, trend: 0 },
    prescriptions: { value: 0, trend: 0 },
    rating: { value: 0, trend: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
        try {
            const data = await getDoctorStats();
            setStats(data);
        } catch (err) {
            console.error('Error fetching doctor stats:', err);
            setError('Failed to load dashboard statistics');
        } finally {
            setLoading(false);
        }
    };

    fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

  const dashboardItems = [
    {
      icon: Calendar,
      title: 'Manage Appointments',
      link: '/doctor/appointments',
      color: 'blue-600'
    },
    {
      icon: Users,
      title: 'My Patients',
      link: '/doctor/patients',
      color: 'green-600'
    },
    {
      icon: Settings,
      title: 'Profile Settings',
      link: '/doctor/profile',
      color: 'yellow-600' 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your practice and patients</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Appointments"
            value={stats.appointments.value}
            icon={Calendar}
            trend={stats.appointments.trend}
          />
          <StatsCard
            title="Total Patients"
            value={stats.patients.value}
            icon={Users}
            trend={stats.patients.trend}
          />
          <StatsCard 
            title="Prescriptions"
            value={stats.prescriptions.value}
            icon={FileText}
            trend={stats.prescriptions.trend}
          />
          <StatsCard
            title="Rating"
            value={stats.rating.value}
            icon={Calendar}
            trend={stats.rating.trend}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dashboardItems.map((item, index) => (
            <DashboardCard key={item.title} {...item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorDashboard;