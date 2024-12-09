import React from 'react';
import ProfileManagement from '../components/ProfileManagement';

const ProfilePage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Manage Your Profile</h1>
            <ProfileManagement />
        </div>
    );
};

export default ProfilePage;

