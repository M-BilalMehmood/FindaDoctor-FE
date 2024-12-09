import api from '../../../services/api';

export const getDashboardStats = async () => {
    try {
        const response = await api.get('/admin/dashboard');
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Error fetching dashboard stats');
    }
};

export const getFeedback = async (params) => {
    try {
        const response = await api.get('/admin/feedback', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Error fetching feedback');
    }
};

export const moderateFeedback = async (feedbackId, data) => {
    try {
        const response = await api.put(`/admin/feedback/${feedbackId}/moderate`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Error moderating feedback');
    }
};

export const getSpamFeedback = async (params) => {
    try {
        const response = await api.get('/admin/spam-feedback', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Error fetching spam feedback');
    }
};

export const reportFeedbackAsSpam = async (feedbackId, reason) => {
    try {
        const response = await api.post('/admin/spam-feedback', {
            feedback: feedbackId,
            reason
        });
        return response.data;
    } catch (error) {
        console.error('Error reporting feedback as spam:', error);
        throw error.response?.data || new Error('Error reporting feedback as spam');
    }
};

export const resolveSpamFeedback = async (reportId, data) => {
    try {
        const response = await api.put(`/admin/spam-feedback/${reportId}/resolve`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Error resolving spam feedback');
    }
};

export const getUsers = async (params) => {
    try {
        const response = await api.get('/admin/users', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error.response?.data || new Error('Error fetching users');
    }
};

export const banUser = async (userId) => {
    try {
        const response = await api.put(`/admin/users/${userId}/ban`);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Error banning user');
    }
};

export const activateUser = async (userId) => {
    try {
        const response = await api.put(`/admin/users/${userId}/activate`);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Error activating user');
    }
};

export const reportUserAsSpam = async (userId, reason) => {
    try {
        const response = await api.post('/admin/spam-reports', {
            reportedUser: userId,
            reason
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Error reporting user');
    }
};

export default {
    getDashboardStats,
    getFeedback,
    moderateFeedback,
    getSpamFeedback,
    reportFeedbackAsSpam,
    resolveSpamFeedback,
    getUsers,
    banUser,
    activateUser,
    reportUserAsSpam
};