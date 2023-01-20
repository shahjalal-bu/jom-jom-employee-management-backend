const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  comment: {
    type: String,
  },
  employeeId: {
    type: String,
  },
  attendance: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
