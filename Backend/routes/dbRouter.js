const express = require('express');
const { query } = require("express");
const { getTest,   } = require('../services/testPostgresService');
const pool = require("../connection/postgres");

const router = express.Router();

router.post('/details', async (req, res) => {
    const {
        uid,
        name,
        email,
        phone,
        address,
        allergies,
        chronicConditions,
        medications,
        immunizations,
    } = req.body;

    try {
        const result = req.body;
        console.log(result)
        res.status(201).json({ message: 'Signup successful', result });
    } catch (error) {
        console.error('Error saving user details:', error);
        res.status(500).json({ error: 'Failed to save user details' });
    }
});


router.get('/getTest', async (req, res) => {
    try {
        const get = await getTest();
        res.send(get);
    } catch(e) {
        console.log(e);
    }
});

router.post('/postTest', async (req, res) => {
    try {
        const {name, phone} = req.body;
        const result = await pool.query(
            'INSERT INTO users (name, phone) VALUES ($1, $2) RETURNING *',
            [name, phone]
        );
        res.send(result.rows);
    } catch (e) {
        console.error(e);
    }
});
module.exports = router;