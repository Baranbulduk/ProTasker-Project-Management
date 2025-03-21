const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model("Project", projectSchema);
