import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Ban, Flag } from 'lucide-react';
import { getUsers, banUser, activateUser, reportUserAsSpam } from '../services/adminApi';

const UserOverview = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedRole, setSelectedRole] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState('');

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

    const handleBanUser = async (userId) => {
        try {
            await banUser(userId);
            fetchUsers(); // Refresh the list
        } catch (err) {
            setError('Failed to ban user');
        }
    };

    const handleActivateUser = async (userId) => {
        try {
            await activateUser(userId);
            fetchUsers(); // Refresh the list
        } catch (err) {
            setError('Failed to activate user');
        }
    };

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        try {
            await reportUserAsSpam(selectedUser._id, reportReason);
            setShowReportModal(false);
            setReportReason('');
            setSelectedUser(null);
        } catch (err) {
            setError('Failed to report user');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Users Overview</h2>
                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-4 py-2 border rounded-md"
                >
                    <option value="all">All Roles</option>
                    <option value="doctor">Doctors</option>
                    <option value="patient">Patients</option>
                    <option value="staff">Staff</option>
                </select>
            </div>
    
            {error && <div className="text-red-500 mb-4">{error}</div>}
    
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
                                {user.isBanned && (
                                    <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Banned</span>
                                )}
                            </div>
                        </div>
                        
                        {/* New Action Buttons */}
                        <div className="flex space-x-2">
                            <button
                                onClick={() => user.isBanned ? 
                                    handleActivateUser(user._id) : 
                                    handleBanUser(user._id)
                                }
                                className={`p-2 rounded hover:bg-gray-100 ${
                                    user.isBanned ? 'text-green-600' : 'text-red-600'
                                }`}
                                title={user.isBanned ? 'Activate User' : 'Ban User'}
                            >
                                <Ban className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
    
            {/* Pagination */}
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
    
            {/* Report Modal */}
            {showReportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full m-4"
                    >
                        <h3 className="text-lg font-bold mb-4">Report User</h3>
                        <form onSubmit={handleReportSubmit}>
                            <textarea
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                placeholder="Reason for reporting..."
                                className="w-full p-2 border rounded-md mb-4"
                                rows="4"
                                required
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowReportModal(false);
                                        setSelectedUser(null);
                                        setReportReason('');
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Report
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );  
};

export default UserOverview;