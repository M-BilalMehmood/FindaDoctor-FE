import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, FileText, ChevronRight, Download, Loader } from 'lucide-react';
import { getDoctorPatients, getPatientHistory } from '../services/doctorApi';
import ImageModal from '../../../components/ImageModal';

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPatients();
    }, 500); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [page, search]);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const data = await getDoctorPatients({ page, search });
      setPatients(data.patients || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

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
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download the image. Please try again.');
    }
  };

  const PatientHistory = ({ history }) => {
    return (
      <div className="space-y-4 overflow-y-auto pr-4" style={{ maxHeight: 'calc(100vh - 300px)' }}>
        {history.map((record) => (
          <motion.div
            key={record._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {record.type === 'appointment' ? (
                  <Calendar className="w-4 h-4 text-blue-500" />
                ) : (
                  <FileText className="w-4 h-4 text-purple-500" />
                )}
                <span className="text-sm text-gray-500">
                  {new Date(record.date).toLocaleDateString()}
                </span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  record.type === 'appointment'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}
              >
                {record.type}
              </span>
            </div>
            <p className="text-gray-700 mb-2">{record.description}</p>
            
            {record.type === 'prescription' && record.imageUrl && (
              <div className="mt-4 space-y-3">
                <div 
                  className="relative h-48 w-full cursor-pointer group"
                  onClick={() => handleImageClick(record.imageUrl)}
                >
                  <img 
                    src={record.imageUrl}
                    alt="Prescription"
                    className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-md" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <p><strong>Illness Type:</strong> {record.illnessType}</p>
                    <p><strong>Doctor:</strong> Dr. {record.doctorName}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDownload(record.imageUrl, `prescription-${record._id}.jpg`)}
                    className="flex items-center px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    <span>Download</span>
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  const fetchPatientHistory = async (patientId) => {
    if (!patientId) {
      console.error('Patient ID is undefined');
      setError('Invalid patient selection');
      return;
    }
  
    try {
      const data = await getPatientHistory(patientId);
      setPatientHistory(data.history || []);
    } catch (err) {
      console.error('Error fetching patient history:', err);
      setError('Failed to load patient history');
    }
  };

  const handlePatientClick = async (patient) => {
    if (!patient || !patient._id) {
      console.error('Invalid patient data:', patient);
      setError('Invalid patient selection');
      return;
    }
    
    setSelectedPatient(patient);
    await fetchPatientHistory(patient._id);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header Section */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">My Patients</h2>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="m-6 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
          {/* Patient List */}
          <div className="lg:col-span-1 border-r">
            <div className="p-4">
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader className="animate-spin h-8 w-8 text-blue-500" />
                </div>
              ) : patients.length > 0 ? (
                <div className="space-y-2 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 250px)' }}>
                  {patients.map((patient) => (
                    <motion.div
                      key={patient._id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => handlePatientClick(patient)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 flex items-center justify-between ${
                        selectedPatient?._id === patient._id
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-200 rounded-full p-2">
                          <User className={`w-5 h-5 ${selectedPatient?._id === patient._id ? 'text-blue-500' : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <h3 className="font-medium">{patient.name}</h3>
                          <p className={`text-sm ${selectedPatient?._id === patient._id ? 'text-white/80' : 'text-gray-500'}`}>
                            {patient.email}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No patients found
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2 p-4 border-t">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={`page-${i + 1}`}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                      page === i + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Patient Details */}
          <div className="lg:col-span-2 p-6">
            {selectedPatient ? (
              <div>
                {/* Patient Info */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Patient Information</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{selectedPatient.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{selectedPatient.email}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{selectedPatient.phone || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="font-medium">{selectedPatient.dateOfBirth || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Patient History */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Medical History</h3>
                  {patientHistory.length > 0 ? (
                    <PatientHistory history={patientHistory} />
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No medical history available
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <User className="w-12 h-12 mb-4" />
                <p>Select a patient to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ImageModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={selectedImage}
      />
    </div>
  );
};

export default DoctorPatients;

