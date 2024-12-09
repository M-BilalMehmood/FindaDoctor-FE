import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, FileText, MessageSquare, Activity, Clock, Users } from 'lucide-react';
import { DashboardCard } from '../../dashboard/DashboardCard';
import { StatsCard } from '../../dashboard/StatsCard';
import { getPatientStats } from '../services/patientApi';

const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const PatientDashboard = () => {
  const [stats, setStats] = useState({
    appointments: { value: 0, trend: 0 },
    upcomingVisits: { value: 0, trend: 0 },
    prescriptions: { value: 0, trend: 0 }
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getPatientStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching patient stats:', error);
      }
    };

    fetchStats();
  }, []);

  const dashboardItems = [
    {
      icon: Search,
      title: 'Find Doctors',
      link: '/patient/search',
      color: 'blue-600'
    },
    {
      icon: Calendar,
      title: 'My Appointments',
      link: '/patient/appointments',
      color: 'green-600'
    },
    {
      icon: FileText,
      title: 'Medical Records',
      link: '/patient/records',
      color: 'purple-600'
    },
    {
      icon: MessageSquare,
      title: 'Feedback',
      link: '/patient/feedback',
      color: 'yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600 mt-2">Here's an overview of your health journey</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Appointments"
            value={stats.appointments.value}
            icon={Activity}
            trend={stats.appointments.trend}
          />
          <StatsCard
            title="Upcoming Visits"
            value={stats.upcomingVisits.value}
            icon={Clock}
            trend={stats.upcomingVisits.trend}
          />
          <StatsCard
            title="Active Prescriptions"
            value={stats.prescriptions.value}
            icon={Users}
            trend={stats.prescriptions.trend}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {dashboardItems.map((item, index) => (
            <DashboardCard key={item.title} {...item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PatientDashboard;