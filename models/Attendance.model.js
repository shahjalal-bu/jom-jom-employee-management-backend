const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  present: {
    type: Boolean,
    required: true,
  },
  comment: {
    type: String,
  },
  employeeId: {
    type: String,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
