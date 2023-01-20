const attendanceService = require("../services/attendance.service");
const Employee = require("../models/Employee.model");

module.exports.create = async (req, res) => {
  try {
    const employee = await attendanceService.create(req.body);
    // console.log(req.body);
    // console.log(employee);
    req.body.forEach(async (element, index) => {
      await Employee.updateOne(
        {
          _id: element.employeeId,
        },
        {
          $push: {
            attendance: employee[index]._id,
          },
        }
      );
    });

    return res.status(200).json(employee);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.findAll = async (req, res) => {
  try {
    const getData = await attendanceService.findAll();
    return res.status(200).json(getData);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
};
module.exports.UpdateAll = async (req, res) => {
  try {
    const fetchedById = await attendanceService.UpdateAll();
    return res.status(200).json(fetchedById);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const fetchedById = await attendanceService.getById(req.params.id);
    return res.status(200).json(fetchedById);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
};
