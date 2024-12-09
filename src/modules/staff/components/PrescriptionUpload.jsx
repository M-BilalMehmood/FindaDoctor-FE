import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { uploadPrescription } from '../services/StaffApi';

const PrescriptionUpload = ({ patientId }) => {
  const [file, setFile] = useState(null);
  const [doctorName, setDoctorName] = useState('');
  const [illnessType, setIllnessType] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !doctorName || !illnessType) {
      alert('Please fill all fields and select a file');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('prescriptionImage', file);
      formData.append('doctorName', doctorName);
      formData.append('illnessType', illnessType);
      formData.append('patientId', patientId);

      await uploadPrescription(formData);
      alert('Prescription uploaded successfully');
      setFile(null);
      setDoctorName('');
      setIllnessType('');
    } catch (error) {
      console.error('Error uploading prescription:', error);
      alert('Failed to upload prescription');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Upload Prescription</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
          <input
            type="text"
            id="doctorName"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="illnessType" className="block text-sm font-medium text-gray-700 mb-1">Illness Type</label>
          <input
            type="text"
            id="illnessType"
            value={illnessType}
            onChange={(e) => setIllnessType(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="prescriptionImage" className="block text-sm font-medium text-gray-700 mb-1">Prescription Image</label>
          <input
            type="file"
            id="prescriptionImage"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-md"
            accept="image/*"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isUploading}
          className="w-full px-6 py-2 bg-primary text-white rounded-md flex items-center justify-center"
        >
          {isUploading ? (
            <>
              <Upload className="animate-spin mr-2" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2" />
              Upload Prescription
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default PrescriptionUpload;