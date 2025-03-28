import axios from 'axios';

const API_URL = 'http://localhost:5003/api/fireAuth';

export const signup = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export { signup, login };


