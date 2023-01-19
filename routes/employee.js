var express = require("express");
var router = express.Router();
const Multer = require("multer");
//userController
const employeeController = require("../controllers/employee.controller");

// Set up the storage for the uploaded files
const multer = Multer({
  storage: Multer.memoryStorage({
    destination: function (req, file, callback) {
      callback(null, "");
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
router.post("/", multer.single("file"), employeeController.create);

router.get("/", employeeController.findAll);
router.get("/:id", employeeController.getById);

module.exports = router;
