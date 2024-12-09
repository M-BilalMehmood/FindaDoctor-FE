import React from 'react';
import SpamFeedback from '../components/SpamFeedback';

const SpamReportPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="py-8">
                    <h1 className="text-3xl font-bold mb-6">Spam Reports</h1>
                    <SpamFeedback />
                </div>
            </div>
        </div>
    );
};

export default SpamReportPage;