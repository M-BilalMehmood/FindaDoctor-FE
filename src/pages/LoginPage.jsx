import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import api from '../services/api';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Regular email/password login
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });
            
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate(`/${response.data.user.role}/dashboard`);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Google OAuth login
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await api.post('/auth/google-login', {
                token: credentialResponse.credential
            });
            
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                // The cookie will be automatically set by the browser
                navigate(`/${response.data.user.role}/dashboard`);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Google login failed');
        }
    };

    const handleGoogleError = () => {
        setError('Google login failed');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    
                    {/* Regular Login Form */}
                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-gray-700">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        {error && <div className="text-red-500">{error}</div>}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </motion.button>
                    </form>

                    {/* Google Login */}
                    <div className="mt-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
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
                                    Sign in with Google
                                </motion.button>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;