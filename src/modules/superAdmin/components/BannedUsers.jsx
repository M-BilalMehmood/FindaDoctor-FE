import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Check } from 'lucide-react';
import { getBannedUsers, authorizeUser } from '../services/superAdminApi';

const BannedUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchBannedUsers();
    }, [page]);

    const fetchBannedUsers = async () => {
        try {
            const data = await getBannedUsers({ page });
            setUsers(data.users);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError('Failed to load banned users');
            setTimeout(() => setError(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleUnban = async (userId) => {
        try {
            await authorizeUser(userId);
            setSuccessMessage('User unbanned successfully');
            setTimeout(() => setSuccessMessage(''), 3000);
            fetchBannedUsers();
        } catch (err) {
            setError('Failed to unban user');
            setTimeout(() => setError(''), 3000);
        }
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
            <h2 className="text-xl font-bold mb-6">Banned Users</h2>
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-600 rounded">
                    {error}
                </div>
            )}
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
                        <button
                            onClick={() => handleUnban(user._id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded"
                            title="Unban User"
                        >
                            <Check className="w-5 h-5" />
                        </button>
                    </motion.div>
                ))}

                {users.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No banned users found
                    </div>
                )}
            </div>

            {totalPages > 1 && (
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
            )}
        </div>
    );
};

export default BannedUsers;