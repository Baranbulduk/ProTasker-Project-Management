const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  memberName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'manager', 'employer']
  }
});

module.exports = mongoose.model("Member", memberSchema);