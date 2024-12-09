import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { logout } from '../services/api';
import logo from '../assets/Logo.png';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleLogoClick = () => {
        if (user) {
            switch (user.role) {
                case 'patient':
                    navigate('/patient/dashboard');
                    break;
                case 'doctor':
                    navigate('/doctor/dashboard');
                    break;
                case 'admin':
                    navigate('/admin/dashboard');
                    break;
                case 'staff':
                    navigate('/staff/dashboard');
                    break;
                case 'superAdmin':
                    navigate('/super-admin/dashboard');
                    break;
                default:
                    navigate('/');
            }
        } else {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <button onClick={handleLogoClick} className="flex-shrink-0 flex items-center">
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    className="h-12 w-auto"
                                    src={logo}
                                    alt="FindADoctor"
                                />
                            </button>
                        </div>
                        <div className="flex items-center">
                            {user ? (
                                <>
                                    <span className="text-gray-700 mr-4">Welcome, {user.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-primary text-white hover:bg-primary-dark px-4 py-2 rounded-md text-sm font-medium"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                                        Login
                                    </Link>
                                    <Link to="/signup" className="bg-primary text-white hover:bg-primary-dark px-4 py-2 rounded-md text-sm font-medium ml-3">
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;