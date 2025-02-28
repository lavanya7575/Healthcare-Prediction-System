const axios = require('axios');
require('dotenv').config();

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

// Firebase REST API endpoints
const SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+FIREBASE_API_KEY;
const LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+FIREBASE_API_KEY;

// Signup with Firebase REST API
const firebaseSignup = async (email, password) => {
    try {
        const response = await axios.post(SIGNUP_URL, {
            email,
            password,
            returnSecureToken: true,
        });
        return response.data; // Returns Firebase user data
    } catch (error) {
        throw new Error(error.response.data.error.message);
    }
};

// Login with Firebase REST API
const firebaseLogin = async (email, password) => {
    try {
        const response = await axios.post(LOGIN_URL, {
            email,
            password,
            returnSecureToken: false,
        });
        return response.data; // Returns Firebase user data
    } catch (error) {
        throw new Error(error.response.data.error.message);
    }
};

module.exports = { firebaseSignup, firebaseLogin };