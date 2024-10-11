const express = require('express');
const router = express.Router();
const { getAssignments, acceptAssignment, rejectAssignment, registerAdmin } = require('../controllers/adminController');
const { loginUser } =  require('../controllers/userController');
const { authenticateJWT } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

// Admin routes
router.post('/register', validate(registerSchema), registerAdmin);
router.post('/login', validate(loginSchema), loginUser);
router.get('/assignments', authenticateJWT, getAssignments);
router.post('/assignments/:id/accept', authenticateJWT, acceptAssignment);
router.post('/assignments/:id/reject', authenticateJWT, rejectAssignment);

module.exports = router;