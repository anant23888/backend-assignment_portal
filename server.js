const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('express').json;
const { dbConnect } = require('./config/db');
const userRoutes = require('./api/userRoutes');
const adminRoutes = require('./api/adminRoutes');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Uncomment if needed for cross-origin requests
app.use(cors());

app.use(bodyParser());

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Simple test route
app.get('/test', (req, res) => {
    res.status(200).json({ message: 'Test Route is working' });
    console.log("Test route hit");
});

app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

// Connect to the database
dbConnect();

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
