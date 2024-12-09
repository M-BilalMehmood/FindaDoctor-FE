import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Stethoscope } from 'lucide-react';

const specialties = [
  { value: '', label: 'All Specialties' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'orthopedics', label: 'Orthopedics' },
  { value: 'psychiatry', label: 'Psychiatry' },
  { value: 'ophthalmology', label: 'Ophthalmology' }
];

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 }
};

const SearchInput = ({ value, onChange, placeholder }) => (
  <div className="relative">
    <input
      type="text"
      className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
  </div>
);

const SpecialtySelect = ({ value, onChange }) => (
  <div className="relative">
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
      <Stethoscope className="w-5 h-5 text-gray-400" />
    </div>
    <select
      value={value}
      onChange={onChange}
      className="w-full pl-12 pr-10 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none transition-all duration-200"
    >
      {specialties.map((specialty) => (
        <option key={specialty.value} value={specialty.value}>
          {specialty.label}
        </option>
      ))}
    </select>
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

const SearchButton = () => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    type="submit"
    className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-xl shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-200 flex items-center justify-center space-x-2"
  >
    <Search className="w-5 h-5" />
    <span>Search</span>
  </motion.button>
);

const DoctorSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ name: searchTerm, specialty });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-9xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg">
        <motion.h2 
          variants={itemVariants}
          className="text-2xl font-bold text-gray-900 mb-6"
        >
          Find Your Doctor
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <motion.div variants={itemVariants} className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doctor's Name
            </label>
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name..."
            />
          </motion.div>

          <motion.div variants={itemVariants} className="md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialty
            </label>
            <SpecialtySelect
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="md:self-end">
            <SearchButton />
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="mt-4 text-sm text-gray-500"
        >
          To see all doctors, leave the search field empty, select all specialties, and Search.
        </motion.div>
      </form>
    </motion.div>
  );
};

export default DoctorSearch;