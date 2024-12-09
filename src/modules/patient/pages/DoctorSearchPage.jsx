import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar } from 'lucide-react';
import { searchDoctors } from '../services/patientApi';
import DoctorSearch from '../components/DoctorSearch';

// DoctorCard Component
const DoctorCard = ({ doctor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start space-x-4">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
          <img
            src={doctor.imageUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(doctor.name)}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
          <p className="text-sm text-gray-600">{doctor.specialty}</p>
          <div className="flex items-center mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{doctor.rating} ({doctor.totalRatings} reviews)</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{doctor.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Next available: {doctor.availableHours}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-primary font-semibold">${doctor.consultationFee}</span>
        <Link to={`/patient/book-appointment/${doctor._id}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Book Appointment
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

// SearchResults Component
const SearchResults = ({ results, isLoading }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Searching for doctors...</p>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No doctors found matching your criteria.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {results.map((doctor) => (
        <DoctorCard key={doctor._id} doctor={doctor} />
      ))}
    </motion.div>
  );
};

// DoctorSearchPage Component
const DoctorSearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await searchDoctors(searchParams); // Replace this with actual API implementation
      setSearchResults(results.doctors);
    } catch (error) {
      console.error('Error searching doctors:', error);
      setError('Failed to search doctors. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
        </motion.div>

        <DoctorSearch onSearch={handleSearch} />

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className="mt-8">
          <SearchResults results={searchResults} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default DoctorSearchPage;
