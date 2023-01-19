const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
  },
  attendance: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Attendance",
    },
  ],
});

module.exports = mongoose.model("Employee", employeeSchema);
