import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';

const CompleteProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, role } = location.state || {};
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!userId || !role) {
    navigate('/signup');
  }

  const commonFields = [
    { name: 'name', type: 'text', label: 'Name', required: true },
  ];

  const roleSpecificFields = {
    patient: [
      { name: 'dateOfBirth', type: 'date', label: 'Date of Birth', required: true },
      { name: 'gender', type: 'select', label: 'Gender', required: true, options: ['Male', 'Female', 'Other'] },
    ],
    doctor: [
      { name: 'specialty', type: 'text', label: 'Specialty', required: true },
      { name: 'qualifications', type: 'text', label: 'Qualifications', required: true },
      { name: 'experience', type: 'number', label: 'Experience (years)', required: true },
      { name: 'PMDCRegistrationNumber', type: 'text', label: 'PMDC Reg no.', required: true },
      { name: 'consultationFee', type: 'number', label: 'Consultation Fee', required: true },
    ],
    staff: [
      { name: 'department', type: 'text', label: 'Department', required: true },
      { name: 'position', type: 'text', label: 'Position', required: true },
      { name: 'employeeId', type: 'text', label: 'Employee ID', required: true },
    ],
  };

  const fields = [
    ...commonFields,
    ...roleSpecificFields[role],
  ];

  const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await api.post('/auth/complete-profile', {
                userId,
                role,
                ...data,
            });

            const { user } = res.data;
            localStorage.setItem('user', JSON.stringify(user));
            navigate(`/${user.role}/dashboard`);
        } catch (err) {
            console.error('Complete profile error:', err);
            setError('Failed to complete profile');
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-gray-700">{field.label}:</label>
                {field.type !== 'select' ? (
                  <input
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                ) : (
                  <select
                    name={field.name}
                    required={field.required}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-2 rounded-md"
            >
              {isLoading ? 'Submitting...' : 'Continue'}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfilePage;