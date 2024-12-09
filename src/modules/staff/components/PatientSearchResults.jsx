import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const PatientCard = ({ patient }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start space-x-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
          <User className="w-full h-full text-gray-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
          <p className="text-sm text-gray-600">{patient.email}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Link to={`/staff/upload-prescription/${patient._id}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Upload Prescription
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

const PatientSearchResults = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Searching for patients...</p>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No patients found matching your criteria.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {results.map((patient) => (
        <PatientCard key={patient._id} patient={patient} />
      ))}
    </motion.div>
  );
};

export default PatientSearchResults;