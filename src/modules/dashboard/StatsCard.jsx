import { motion } from 'framer-motion';

const statsVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { y: -5 }
};

export const StatsCard = ({ title, value, icon: Icon, trend }) => {
  const isPositive = trend > 0;
  
  return (
    <motion.div
      variants={statsVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
        {trend && (
          <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            <span className="text-sm font-medium">{Math.abs(trend)}%</span>
            <svg
              className={`w-4 h-4 ml-1 ${isPositive ? 'rotate-0' : 'rotate-180'}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 15l7-7 7 7" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
};