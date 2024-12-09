import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Check, X, Ban, Users, UserCog, UserCheck, Shield } from 'lucide-react';
import { getUsers, authorizeUser, banUser } from '../services/superAdminApi';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedRole, setSelectedRole] = useState('all');
    const [banningUserId, setBanningUserId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [page, selectedRole]);

    const fetchUsers = async () => {
        try {
            const data = await getUsers({ page, role: selectedRole !== 'all' ? selectedRole : '' });
            setUsers(data.users);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleAuthorize = async (userId) => {
        try {
            await authorizeUser(userId);
            fetchUsers();
        } catch (err) {
            setError('Failed to authorize user');
        }
    };

    const handleBan = async (userId) => {
        try {
            setBanningUserId(userId); // Show loading state
            await banUser(userId);
            setSuccessMessage('User banned successfully');
            setTimeout(() => setSuccessMessage(''), 3000);
            await fetchUsers(); // Refresh the list
        } catch (err) {
            setError('Failed to ban user');
            setTimeout(() => setError(''), 3000);
        } finally {
            setBanningUserId(null); // Hide loading state
        }
    };

    const RoleFilter = ({ selectedRole, onChange }) => {
        const roles = [
            { value: 'all', label: 'All Users', Icon: Users },
            { value: 'doctor', label: 'Doctors', Icon: UserCog },
            { value: 'patient', label: 'Patients', Icon: UserCheck },
            { value: 'admin', label: 'Admins', Icon: Shield }
        ];
    
        return (
            <div className="relative inline-block">
                <select
                    value={selectedRole}
                    onChange={(e) => onChange(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-gray-700 cursor-pointer hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                    {roles.map(({ value, label, Icon }) => (
                        <option key={value} value={value} className="py-2">
                            {label}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">User Management</h2>
                <RoleFilter 
                    selectedRole={selectedRole}
                    onChange={setSelectedRole}
                />
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 text-green-600 rounded">
                    {successMessage}
                </div>
            )}

            <div className="grid gap-4">
                {users.map((user) => (
                    <motion.div
                        key={user._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
                    >
                        <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-full ${
                                user.role === 'doctor' ? 'bg-blue-100' :
                                user.role === 'patient' ? 'bg-green-100' :
                                'bg-purple-100'
                            }`}>
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-medium">{user.name}</h3>
                                <p className="text-sm text-gray-500">{user.email}</p>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{user.role}</span>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            {!user.isActive && (
                                <button
                                    onClick={() => handleAuthorize(user._id)}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded"
                                    title="Authorize User"
                                >
                                    <Check className="w-5 h-5" />
                                </button>
                            )}
                            <button
                                onClick={() => handleBan(user._id)}
                                disabled={banningUserId === user._id}
                                className={`p-2 text-red-600 hover:bg-red-50 rounded ${
                                    banningUserId === user._id ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                title="Ban User"
                            >
                                {banningUserId === user._id ? (
                                    <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Ban className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-4 flex justify-center space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-1 rounded ${
                            page === i + 1 ? 'bg-primary text-white' : 'bg-gray-200'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserManagement;