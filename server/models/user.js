const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'employer'],
        default: 'employer'
    },
    // IN PROGRESS //
    lastLogin: {
        type: Date,
        default: null
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }]
});

module.exports = mongoose.model('User', userSchema);