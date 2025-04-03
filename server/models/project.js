const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    startDate: { // TA BORT
        type: Date
    },
    endDate: { // TA BORT
        type: Date
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
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
