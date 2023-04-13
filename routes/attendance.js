var express = require("express");
var router = express.Router();
//userController
const attendanceController = require("../controllers/attendance.controller");

router.post("/", attendanceController.create);

router.get("/", attendanceController.findAll);
// http://localhost:9000/attendance/month-year-attendace?year=2022&month=6
router.get("/month-year-attendace", attendanceController.findWithMonthAndYear);
router.get("/:id", attendanceController.getById);

router.put("/updateall", attendanceController.UpdateAll);

module.exports = router;
