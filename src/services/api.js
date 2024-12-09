import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true, // Ensure this is set
});

// Example Login Function
// export const login = async (email, password) => {
//     try {
//         const response = await api.post('/auth/login', { email, password });
//         const { user } = response.data;
//         // Token is already set in the cookie by the backend
//         localStorage.setItem('user', JSON.stringify(user));
//         return { user };
//     } catch (error) {
//         console.error('Login error:', error.response ? error.response.data : error.message);
//         throw error.response ? error.response.data : new Error('Server error');
//     }
// };

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const { user, token } = response.data;
        
        // Store token in cookie
        Cookies.set('token', token, { secure: true });
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        
        return { user };
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error.response?.data || new Error('Server error');
    }
};

// Other API functions...
export const signup = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const googleLogin = async (googleData) => {
    try {
        const response = await api.post('/auth/google-login', {
            token: googleData.credential
        }, {
            withCredentials: true // Make sure cookies are sent/received
        });
        
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Google login failed');
    }
};

export const googleSignup = async (data) => {
    try {
        const response = await api.post('/auth/google-signup', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Server error');
    }
};

export const completeProfile = async (profileData) => {
    try {
        const response = await api.post('/auth/complete-profile', profileData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Server error');
    }
};

export const logout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
};

export default api;