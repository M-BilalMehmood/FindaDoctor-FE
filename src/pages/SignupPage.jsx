import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { FaGoogle } from 'react-icons/fa';
import Form from '../components/Form';
import api, { signup, googleSignup } from '../services/api';

const SignupPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState('patient');
    const [additionalInfo, setAdditionalInfo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.role = role;
        try {
            const response = await signup(data);
            console.log('Signup successful', response);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'An error occurred during signup');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
      try {
        const { credential } = credentialResponse;
        const res = await api.post('/auth/google-signup', {
          token: credential,
          role: role,
        });
  
        const { user, requiresAdditionalInfo } = res.data;
  
        if (requiresAdditionalInfo) {
          navigate('/complete-profile', { state: { userId: user._id, role } });
        } else {
          localStorage.setItem('user', JSON.stringify(user));
          navigate(`/${user.role}/dashboard`);
        }
      } catch (err) {
        console.error('Google signup error:', err);
        setError('Google signup failed');
      }
    };
  
    const handleGoogleError = () => {
      setError('Google signup failed');
    };

    const commonFields = [
        { name: 'name', type: 'text', label: 'Name', required: true },
        { name: 'email', type: 'email', label: 'Email address', required: true },
        { name: 'password', type: 'password', label: 'Password', required: true },
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-lg p-1 bg-gray-100">
                        {['patient', 'doctor', 'staff'].map((r) => (
                            <motion.button
                                key={r}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setRole(r)}
                                className={`px-6 py-2 rounded-lg text-sm font-medium ${
                                    role === r
                                        ? 'bg-white text-primary shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                {r.charAt(0).toUpperCase() + r.slice(1)}
                            </motion.button>
                        ))}
                    </div>
                </div>
                <Form
                    title="Create your account"
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitText="Sign up"
                    isLoading={isLoading}
                    error={error}
                />
                <div className="mt-4">
                {!additionalInfo && (
                  <div>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Continue with</span>
                      </div>
                    </div>
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      render={({ onClick, disabled }) => (
                        <motion.button
                          onClick={onClick}
                          disabled={disabled}
                          className="mt-4 w-full flex items-center justify-center px-4 py-2 border rounded-md"
                        >
                          <FaGoogle className="h-5 w-5 mr-2" />
                          Sign up with Google
                        </motion.button>
                      )}
                    />
                  </div>
                )}
                </div>
            </div>
        </div>
    );
};

export default SignupPage;

