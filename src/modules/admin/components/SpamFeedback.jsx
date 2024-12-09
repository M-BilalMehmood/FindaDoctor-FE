import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flag, Check, X } from 'lucide-react';
import { getSpamFeedback, resolveSpamFeedback } from '../services/adminApi';

const SpamFeedback = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchReports();
    }, [page]);

    const fetchReports = async () => {
        try {
            const data = await getSpamFeedback({ page });
            setReports(data.spamFeedbacks);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError('Failed to load spam feedback');
        } finally {
            setLoading(false);
        }
    };

    const handleResolve = async (reportId, status) => {
        try {
            await resolveSpamFeedback(reportId, { 
                status,
                resolution: status === 'Resolved' ? 'Feedback removed' : 'Feedback kept'
            });
            fetchReports();
        } catch (err) {
            setError('Failed to resolve feedback');
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
            <h2 className="text-xl font-bold mb-4">Spam Feedback Reports</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="space-y-4">
                {reports.map((report) => (
                    <motion.div
                        key={report._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white p-4 rounded-lg shadow"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="font-medium mb-2">
                                    Reported Feedback:
                                </div>
                                <div className="bg-gray-50 p-3 rounded mb-3">
                                    <p className="text-sm text-gray-600">
                                        From: {report.feedback.patient.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        To: Dr. {report.feedback.doctor.name}
                                    </p>
                                    <p className="mt-2">{report.feedback.comment}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Rating: {report.feedback.rating}/5
                                    </p>
                                </div>
                                <p className="text-gray-600">
                                    Reported By: {report.reportedBy.name}
                                </p>
                                <p className="text-gray-600 mt-2">
                                    Reason: {report.reason}
                                </p>
                                <p className={`mt-2 ${
                                    report.status === 'Pending' ? 'text-yellow-600' :
                                    report.status === 'Resolved' ? 'text-green-600' :
                                    'text-red-600'
                                }`}>
                                    Status: {report.status}
                                </p>
                            </div>
                            {report.status === 'Pending' && (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleResolve(report._id, 'Resolved')}
                                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                                        title="Remove Feedback"
                                    >
                                        <Check className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleResolve(report._id, 'Dismissed')}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                        title="Keep Feedback"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
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
        </div>
    );
};

export default SpamFeedback;