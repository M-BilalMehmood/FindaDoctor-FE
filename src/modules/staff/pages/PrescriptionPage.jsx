import React from 'react';
import PrescriptionUpload from '../components/PrescriptionUpload';
import PrescriptionList from '../components/PrescriptionList';

const PrescriptionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Prescriptions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <PrescriptionUpload />
        </div>
        <div>
          <PrescriptionList />
        </div>
      </div>
    </div>
  );
};

export default PrescriptionsPage;