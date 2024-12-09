import React from 'react';
import { useParams } from 'react-router-dom';
import PrescriptionUpload from '../components/PrescriptionUpload';

const UploadPrescriptionPage = () => {
  const { patientId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <PrescriptionUpload patientId={patientId} />
    </div>
  );
};

export default UploadPrescriptionPage;