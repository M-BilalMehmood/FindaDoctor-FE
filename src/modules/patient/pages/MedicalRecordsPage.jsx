import React, { useState, useEffect } from 'react';
import MedicalRecords from '../components/MedicalRecords';
import { getMedicalRecords } from '../services/patientApi';

const MedicalRecordsPage = () => {
    const [records, setRecords] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            try {
                const data = await getMedicalRecords();
                setRecords(data); // Ensure data is an array
            } catch (error) {
                console.error('Error fetching medical records:', error);
                setError('Failed to fetch medical records.');
            }
        };

        fetchMedicalRecords();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Medical Records</h1>
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}
            <MedicalRecords records={records} />
        </div>
    );
};

export default MedicalRecordsPage;