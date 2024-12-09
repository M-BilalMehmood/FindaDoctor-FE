import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { 
    scale: 1.05,
    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
  },
  tap: { scale: 0.95 }
};

export const DashboardCard = ({ icon: Icon, title, description, link, color = "primary" }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.2 }}
    >
      <Link
        to={link}
        className="block h-full p-6 bg-white rounded-xl shadow-md overflow-hidden relative group"
      >
        <div className={`absolute inset-0 bg-${color}/5 transform transition-transform duration-300 group-hover:scale-95`} />
        <div className="relative z-10">
          <div className={`inline-flex p-3 rounded-lg bg-${color}/10 mb-4`}>
            <Icon className={`w-6 h-6 text-${color}`} />
          </div>
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h2>
          <p className="text-gray-600">{description}</p>
          <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
            →
          </div>
        </div>
      </Link>
    </motion.div>
  );
};