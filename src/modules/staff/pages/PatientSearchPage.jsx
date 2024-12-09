import React from 'react';
import PatientSearch from '../components/PatientSearch';

const PatientSearchPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PatientSearch />
      </div>
    </div>
  );
};

export default PatientSearchPage;