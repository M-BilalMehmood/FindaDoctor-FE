import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Trash2, Download } from 'lucide-react';
import { getPrescriptions, deletePrescription } from '../services/StaffApi';

const PrescriptionList = () => {
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const fetchPrescriptions = async () => {
        try {
            const data = await getPrescriptions();
            setPrescriptions(data.prescriptions);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this prescription?')) {
            try {
                await deletePrescription(id);
                setPrescriptions(prescriptions.filter(p => p._id !== id));
            } catch (error) {
                console.error('Error deleting prescription:', error);
                alert('Failed to delete prescription');
            }
        }
    };

    return (
        <div className="space-y-4">
            {prescriptions.map((prescription) => (
                <motion.div
                    key={prescription._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-lg shadow-md"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <FileText className="w-6 h-6 mr-3 text-primary" />
                            <h3 className="text-lg font-semibold">{prescription.illnessType}</h3>
                        </div>
                        <span className="text-sm text-gray-500">{new Date(prescription.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600 mb-4">Dr. {prescription.doctorName}</p>
                    <div className="flex justify-between items-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(prescription._id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 size={20} />
                        </motion.button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default PrescriptionList;

