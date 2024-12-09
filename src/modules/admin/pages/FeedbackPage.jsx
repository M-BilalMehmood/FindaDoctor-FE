import React from 'react';
import FeedbackManagement from '../components/FeedbackManagement';

const FeedbackPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="py-8">
                    <h1 className="text-3xl font-bold mb-6">Feedback Management</h1>
                    <FeedbackManagement />
                </div>
            </div>
        </div>
    );
};

export default FeedbackPage;