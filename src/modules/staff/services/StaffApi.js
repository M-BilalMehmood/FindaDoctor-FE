import api from '../../../services/api';

export const getStaffProfile = async () => {
    try {
        const response = await api.get('/staff/profile');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error fetching staff profile');
    }
};

export const updateStaffProfile = async (profileData) => {
    try {
        const response = await api.put('/staff/profile', profileData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error updating staff profile');
    }
};

export const uploadPrescription = async (formData) => {
    try {
        const response = await api.post('/staff/prescriptions', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error uploading prescription');
    }
};

export const getPrescriptions = async () => {
    try {
        const response = await api.get('/staff/prescriptions');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error fetching prescriptions');
    }
};

export const deletePrescription = async (id) => {
    try {
        const response = await api.delete(`/staff/prescriptions/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error deleting prescription');
    }
};

export const getPendingAppointments = async () => {
    try {
        const response = await api.get('/staff/appointments?status=Pending&page=1&limit=10');
        return response.data.appointments;
    } catch (error) {
        console.error('Error fetching pending appointments:', error);
        throw error;
    }
};

export const searchPatients = async (searchParams) => {
    try {
      const response = await api.get('/staff/patients/search', { params: searchParams });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Error searching patients');
    }
};

export const scheduleAppointment = async (appointmentId, slot) => {
    try {
        const response = await api.put(`/staff/appointments/${appointmentId}/schedule`, { slot });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error scheduling appointment');
    }
};

export default {
    getStaffProfile,
    updateStaffProfile,
    uploadPrescription,
    getPrescriptions,
    deletePrescription,
    getPendingAppointments,
    scheduleAppointment,
    searchPatients,
};

