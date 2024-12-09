import api from '../../../services/api';

export const getDashboardStats = async () => {
    try {
        const response = await api.get('/super-admin/dashboard');
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Error fetching dashboard stats');
    }
};

export const getUsers = async (params) => {
    try {
        const response = await api.get('/super-admin/users', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Error fetching users');
    }
};

export const getBannedUsers = async (params) => {
    try {
        const response = await api.get('/super-admin/users/banned', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Error fetching banned users');
    }
};

export const authorizeUser = async (userId) => {
    try {
        const response = await api.put(`/super-admin/users/${userId}/authorize`);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Error authorizing user');
    }
};

export const banUser = async (userId) => {
    try {
        const response = await api.put(`/super-admin/users/${userId}/ban`);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Error banning user');
    }
};

export const searchUsers = async (query) => {
    try {
        const response = await api.get('/super-admin/users/search', { params: query });
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Error searching users');
    }
};

export default {
    getDashboardStats,
    getUsers,
    getBannedUsers,
    authorizeUser,
    banUser,
    searchUsers
};