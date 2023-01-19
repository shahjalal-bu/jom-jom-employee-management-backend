const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const employeeRouter = require("./routes/employee");
const attendanceRouter = require("./routes/attendance");

const app = express();

app.use(express.json());

const port = 9000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.use("/", indexRouter);
app.use("/employee", employeeRouter);
app.use("/attendance", attendanceRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
