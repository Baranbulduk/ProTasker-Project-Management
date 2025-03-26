const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["Begin", "Ongoing", "Completed"],
        default: "Begin"
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    notifications: [{
        status: {
            type: String,
            enum: ["Ongoing", "Completed"]
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
    }]
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Task", taskSchema);
