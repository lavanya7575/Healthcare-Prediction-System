const express = require('express');
const { firebaseSignup, firebaseLogin } = require('../services/firebaseService');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await firebaseSignup(email, password);
        res.status(201).json({ message: 'Signup successful', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await firebaseLogin(email, password);
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;