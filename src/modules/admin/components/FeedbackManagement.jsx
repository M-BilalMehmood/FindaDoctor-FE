import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, AlertTriangle, Flag } from 'lucide-react';
import { getFeedback, moderateFeedback, reportFeedbackAsSpam } from '../services/adminApi';

const FeedbackManagement = () => {
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchFeedback();
    }, [page]);

    const fetchFeedback = async () => {
        try {
            const data = await getFeedback({ page });
            setFeedback(data.feedback);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError('Failed to load feedback');
        } finally {
            setLoading(false);
        }
    };

    const handleReportSpam = async (feedbackId) => {
        try {
            await reportFeedbackAsSpam(feedbackId, "Marked as spam by administrator"); // Changed structure
            
            // Show success message
            setError('Feedback reported as spam successfully');
            setTimeout(() => setError(''), 3000);
            
            // Refresh the feedback list
            await fetchFeedback();
        } catch (err) {
            console.error('Error reporting spam:', err);
            setError(err.response?.data?.message || 'Failed to report feedback');
        }
    };

    const handleModerate = async (feedbackId, isModerated) => {
        try {
            await moderateFeedback(feedbackId, { isModerated });
            fetchFeedback();
        } catch (err) {
            setError('Failed to moderate feedback');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Feedback Management</h2>
            <div className="space-y-4">
                {feedback.map((item) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white p-4 rounded-lg shadow"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-medium">
                                    From: {item.patient.name} To: Dr. {item.doctor.name}
                                </p>
                                <p className="text-gray-600">{item.comment}</p>
                                <div className="flex items-center mt-2">
                                    <span className="text-sm text-gray-500">
                                        Rating: {item.rating}/5
                                    </span>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleReportSpam(item._id)}
                                    className="p-2 text-yellow-600 hover:bg-yellow-50 rounded"
                                    title="Report as Spam"
                                >
                                    <Flag className="w-5 h-5" />
                                </button>
                            </div>
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

export default FeedbackManagement;