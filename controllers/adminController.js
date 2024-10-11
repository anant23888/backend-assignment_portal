const Assignment = require('../models/Assignment');
const User = require('../models/User');
const bcrypt = require('bcrypt')
// controllers/adminController.js

exports.registerAdmin = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            username,
            email,
            password: hashedPassword,
            role: 'Admin'
        });

        await user.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Get Admin Assignments
exports.getAssignments = async (req, res) => {
    const adminId = req.user.id;
    try {
        const adminUser = await User.findOne({ _id: adminId });
        const assignments = await Assignment.find({admin: adminUser.username });
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assignments' });
    }
};

// Accept Assignment
exports.acceptAssignment = async (req, res) => {
    const { id } = req.params;

    try {
        const assignment = await Assignment.findById(id);
        if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

        assignment.status = 'Accepted';
        await assignment.save();
        res.json({ message: 'Assignment accepted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to accept assignment' });
    }
};

// Reject Assignment
exports.rejectAssignment = async (req, res) => {
    const { id } = req.params;

    try {
        const assignment = await Assignment.findById(id);
        if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

        assignment.status = 'Rejected';
        await assignment.save();
        res.json({ message: 'Assignment rejected' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reject assignment' });
    }
};
