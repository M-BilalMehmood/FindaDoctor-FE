import api from '../../../services/api';

export const getAllDoctors = async () => {
    try {
        const response = await api.get('/patient/doctors');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error fetching doctors');
    }
}

export const searchDoctors = async (searchParams) => {
    try {
        const response = await api.get('/patient/doctors/search', { params: searchParams });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error searching doctors');
    }
};

export const getAppointments = async () => {
    try {
        const response = await api.get('/patient/appointments');
        return response.data.appointments;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error fetching appointments');
    }
};

export const bookAppointment = async (doctorId, appointmentData) => {
    try {
        const response = await api.post('/patient/appointments', {
            doctorId,
            ...appointmentData
        });
        
        if (!response.data) {
            throw new Error('No data received from server');
        }
        
        return response.data;
    } catch (error) {
        console.error('Booking error:', error.response?.data || error.message);
        throw error.response?.data || new Error('Failed to book appointment');
    }
};

export const getFeedback = async () => {
    try {
        const response = await api.get('/patient/feedback');
        console.log('API Response:', response.data);
        return response.data.feedback;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error fetching feedback');
    }
};

export const submitFeedback = async (feedbackData) => {
    try {
        const response = await api.post('/patient/feedback', feedbackData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error submitting feedback');
    }
};

export const getMedicalRecords = async () => {
    try {
        const response = await api.get('/patient/medical-records');
        return response.data.records;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error fetching medical records');
    }
};

export const getDoctorById = async (doctorId) => {
    try {
        const response = await api.get(`/patient/doctors/${doctorId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error fetching doctor details');
    }
};

/**
 * Fetch patient statistics
 * @returns {Promise<Object>}
 */
export const getPatientStats = async () => {
    try {
        const response = await api.get('/patient/stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching patient stats:', error);
        throw error.response ? error.response.data : new Error('Server error');
    }
};

export default {
    searchDoctors,
    getAppointments,
    bookAppointment,
    submitFeedback,
    getMedicalRecords,
};

