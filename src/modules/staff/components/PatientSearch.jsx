import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { searchPatients } from '../services/StaffApi';
import PatientSearchResults from './PatientSearchResults';
import { Search } from 'lucide-react';

const PatientSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const results = await searchPatients({ name: searchTerm });
      setSearchResults(results.patients);
    } catch (err) {
      setError('Failed to search patients. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Find a Patient</h2>
        <div className="flex items-center">
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="ml-4 px-6 py-3 bg-primary text-white rounded-xl shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-200 flex items-center justify-center"
          >
            <Search className="w-5 h-5" />
            <span className="ml-2">Search</span>
          </button>
        </div>
        {error && (
          <div className="mt-4 text-red-600">
            {error}
          </div>
        )}
      </form>

      <div className="mt-6">
        <PatientSearchResults results={searchResults} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default PatientSearch;