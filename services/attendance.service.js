const Attendance = require("../models/Attendance.model");
module.exports.create = (attendance) => {
  return Attendance.create(attendance);
};
module.exports.findAll = () => {
  return Attendance.find();
};
// Get data by id
module.exports.getById = (id) => {
  return Attendance.find({ _id: id });
};

// find one and update
module.exports.findOneAndUpdate = (req) => {
  return Attendance.findOneAndUpdate({ _id: req.params.id }, req.body);
};

// find one and update
module.exports.UpdateAll = (req) => {
  return Attendance.updateMany({ present: true }, { $unset: { present: 1 } });
};

// find one and delete
module.exports.findAndDelete = (req) => {
  return Attendance.findOneAndDelete(req.params.id);
};
