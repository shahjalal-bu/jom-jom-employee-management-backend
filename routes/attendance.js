var express = require("express");
var router = express.Router();
//userController
const attendanceController = require("../controllers/attendance.controller");

router.post("/", attendanceController.create);

router.get("/", attendanceController.findAll);
router.get("/:id", attendanceController.getById);

router.put("/updateall", attendanceController.UpdateAll);

module.exports = router;
