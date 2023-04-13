const Attendance = require("../models/Attendance.model");
module.exports.create = (attendance) => {
  return Attendance.create(attendance);
};

//find all

module.exports.findAll = () => {
  return Attendance.find();
};

// find With Month And Year
module.exports.findWithMonthAndYear = (req) => {
  const yearInt = parseInt(req.query.year);
  const monthInt = parseInt(req.query.month);

  return Attendance.find({
    $expr: {
      $and: [
        { $eq: [{ $year: "$date" }, yearInt] },
        { $eq: [{ $month: "$date" }, monthInt] },
      ],
    },
  });
};
// Get data by id
module.exports.getById = (req) => {
  return Attendance.find({ _id: req.params.id });
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
