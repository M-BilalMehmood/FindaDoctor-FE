import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus } from 'lucide-react';
import { getPrescriptions } from '../services/doctorApi';

const PrescriptionCard = ({ prescription }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-semibold text-lg">{prescription.patientName}</h3>
                    <p className="text-gray-600">{prescription.diagnosis}</p>
                </div>
                <span className="text-sm text-gray-500">
                    {new Date(prescription.date).toLocaleDateString()}
                </span>
            </div>
            <div className="space-y-2">
                <p className="text-sm text-gray-600">
                    <strong>Medications:</strong> {prescription.medications.join(', ')}
                </p>
                <p className="text-sm text-gray-600">
                    <strong>Instructions:</strong> {prescription.instructions}
                </p>
            </div>
        </motion.div>
    );
};

const PrescriptionsPage = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const data = await getPrescriptions();
                setPrescriptions(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load prescriptions');
                setLoading(false);
            }
        };

        fetchPrescriptions();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading prescriptions...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-8">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <motion.h1 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-bold"
                >
                    Prescriptions
                </motion.h1>
                
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center px-4 py-2 bg-primary text-white rounded-md"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    New Prescription
                </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prescriptions.map((prescription) => (
                    <PrescriptionCard 
                        key={prescription._id} 
                        prescription={prescription} 
                    />
                ))}
            </div>

            {prescriptions.length === 0 && (
                <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No prescriptions found</p>
                </div>
            )}
        </div>
    );
};

export default PrescriptionsPage;