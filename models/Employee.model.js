const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  from: { type: Date, required: true },
  to: { type: Date },
  salary: { type: Number, required: true },
});

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  salary: { type: [salarySchema], required: true },
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
