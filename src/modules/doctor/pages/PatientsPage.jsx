import React from 'react';
import DoctorPatients from '../components/DoctorPatients';

const PatientsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DoctorPatients />
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;