import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Calendar, User } from 'lucide-react';
import ImageModal from '../../../components/ImageModal';

const MedicalRecords = ({ records }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (url) => {
    setSelectedImage(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  const handleDownload = async (imageUrl, fileName) => {
    try {
      const response = await fetch(imageUrl);//, {
      //  mode: 'cors', // Ensure CORS is enabled on the server
      //});
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName || 'prescription'); // Default filename
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading the image:', error);
      alert('Failed to download the image. Please try again.');
    }
  };

  if (records.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No medical records found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {records.map((record) => (
        <motion.div
          key={record._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          {/* Image Section */}
          <div 
            className="h-48 w-full cursor-pointer relative group"
            onClick={() => handleImageClick(record.imageUrl)}
          >
            {record.imageUrl ? (
              <>
                <img
                  src={record.imageUrl}
                  alt="Medical Record"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
              </>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {record.illnessType}
                </h3>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-1" />
                  <span>Dr. {record.doctorName}</span>
                </div>
              </div>
              <motion.button
                onClick={() => handleDownload(record.imageUrl, `prescription-${record._id}.jpg`)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-3 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4 mr-1" />
                <span>Download</span>
              </motion.button>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{new Date(record.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>
      ))}
      
      <ImageModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        imageUrl={selectedImage} 
      />
    </div>
  );
};

export default MedicalRecords;