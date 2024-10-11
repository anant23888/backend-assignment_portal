const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
    task: {type: String, required: true},
    admin: {type: String, required: true},
    status: {type: String, enum: ['Accepted', 'Rejected', 'Pending'], default: 'Pending'},
    createdAt: {type: Date, default: Date.now },
});

module.exports = mongoose.model('Assignment', assignmentSchema);