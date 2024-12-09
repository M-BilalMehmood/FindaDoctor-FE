import api from '../../../services/api';

export const getDoctorProfile = async () => {
    try {
        const response = await api.get('/doctor/profile');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error fetching doctor profile');
    }
};

export const updateDoctorProfile = async (profileData) => {
    try {
        const response = await api.put('/doctor/profile', profileData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error updating doctor profile');
    }
};

export const getAppointments = async (status) => {
    try {
        const response = await api.get('/doctor/appointments', {
            params: { status }
        });
        return response.data.appointments;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error fetching appointments');
    }
};

export const updateAppointment = async (appointmentId, status) => {
    try {
        const response = await api.put(`/doctor/appointments/${appointmentId}`, { status });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error updating appointment');
    }
};

export const getDoctorStats = async () => {
    try {
        const response = await api.get('/doctor/stats');
        return response.data || {
            appointments: { value: 0, trend: 0 },
            patients: { value: 0, trend: 0 },
            prescriptions: { value: 0, trend: 0 },
            rating: { value: 0, trend: 0 }
        };
    } catch (error) {
        console.error('Error fetching doctor stats:', error);
        // Return default values if there's an error
        return {
            appointments: { value: 0, trend: 0 },
            patients: { value: 0, trend: 0 },
            prescriptions: { value: 0, trend: 0 },
            rating: { value: 0, trend: 0 }
        };
    }
};

export const getPrescriptions = async () => {
    try {
        const response = await api.get('/doctor/prescriptions');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error fetching prescriptions');
    }
};

export const getDoctorPatients = async (params) => {
    try {
      const response = await api.get('/doctor/patients', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Error fetching patients');
    }
};
  
export const getPatientHistory = async (patientId) => {
    if (!patientId) {
      throw new Error('Patient ID is required');
    }
  
    try {
        const response = await api.get(`/doctor/patients/${patientId}/history`);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error.response?.data || new Error('Error fetching patient history');
    }
};

export default {
    getDoctorProfile,
    updateDoctorProfile,
    getAppointments,
    updateAppointment,
    getDoctorStats,
    getPrescriptions,
    getDoctorPatients,
    getPatientHistory,
};