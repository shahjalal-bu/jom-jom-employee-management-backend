const Employee = require("../models/Employee.model");
module.exports.create = (shop) => {
  return Employee.create(shop);
};
module.exports.findAll = () => {
  return Employee.find();
};
// Get data by id
module.exports.getById = (id) => {
  return Employee.find({ _id: id });
};
// find one and update
module.exports.findOneAndUpdate = (req) => {
  return Employee.findOneAndUpdate({ _id: req.params.id }, req.body);
};
// find one and update
module.exports.findAndDelete = (req) => {
  return Employee.findOneAndDelete(req.params.id);
};
