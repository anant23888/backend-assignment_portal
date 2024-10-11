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

app.use(cors());

app.use(bodyParser());

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Connect to the database
dbConnect();


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
