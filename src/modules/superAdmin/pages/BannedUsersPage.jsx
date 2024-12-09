import React from 'react';
import BannedUsers from '../components/BannedUsers';

const BannedUsersPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="py-8">
                    <h1 className="text-3xl font-bold mb-6">Banned Users</h1>
                    <BannedUsers />
                </div>
            </div>
        </div>
    );
};

export default BannedUsersPage;