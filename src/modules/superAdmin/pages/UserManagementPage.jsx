import React from 'react';
import UserManagement from '../components/UserManagement';

const UserManagementPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="py-8">
                    <h1 className="text-3xl font-bold mb-6">User Management</h1>
                    <UserManagement />
                </div>
            </div>
        </div>
    );
};

export default UserManagementPage;