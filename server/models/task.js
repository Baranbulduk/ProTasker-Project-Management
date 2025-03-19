const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["Begin", "Ongoing", "Completed"],
        default: "Begin"
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    notifications: [{
        status: {
            type: String,
            enum: ["Ongoing", "Completed"]
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model("Task", taskSchema);
