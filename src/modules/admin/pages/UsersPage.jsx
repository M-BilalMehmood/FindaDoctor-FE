import React from 'react';
import UserOverview from '../components/UserOverview';

const UsersPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="py-8">
                    <h1 className="text-3xl font-bold mb-6">User Management</h1>
                    <UserOverview />
                </div>
            </div>
        </div>
    );
};

export default UsersPage;