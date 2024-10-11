const express = require('express');
const router = express.Router();
const { registerUser, loginUser, uploadAssignment, getAllAdmins } = require('../controllers/userController');
const { authenticateJWT } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const Joi = require('joi');

// Validation schemas
const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

const uploadSchema = Joi.object({
    task: Joi.string().required(),
    admin: Joi.string().required(),
});

// User routes
router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.post('/upload', authenticateJWT, validate(uploadSchema), uploadAssignment);
router.get('/admins', getAllAdmins);

module.exports = router;
