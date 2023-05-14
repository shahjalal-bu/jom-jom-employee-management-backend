const employeeService = require("../services/employee.service");
const { google } = require("googleapis");
const { Readable } = require("stream");

const bufferToStream = (buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};
async function uploadFile(req, res) {
  let file = req.file;
  try {
    const auth = new google.auth.GoogleAuth({
      // keyFile: "./googledriveapi.json",
      credentials: {
        type: "service_account",
        project_id: "jom-jom",
        private_key_id: "f820e4c62074037f74f0f275da54b3f55c8c12ba",
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8xNYRPBd+bFUg\n+kF6fbHqx//HphE/BYE5PX1BrM76+DKZS5wfQFIcuhwTzcpe2rURcf1ci9W+Nri+\n7+PG+4A9uqvLMw/p+CB4kpJUqMr/zimUDdlQtD0ISY3+VHRnTaZvevM6rZQkuK8W\nCkIlSm912ok/O2qWLgUcAFeNcjRvoNuyeqQvtsl4AyEpvkhHsBk8S0UB78pnYG0h\nk/a1X6MjB1RjYzfPJmO+l2DTsM7jYYIGmZm4uxmDMok/Vpbg4eLsURWz6DnXmKVh\n/+AJWssKa4oXkAxXoRCRZF2tY2iInMp/pMjLriPi2DHidBzFbkKiTvglQHW+DrYh\nVZ6RcM/LAgMBAAECggEAFUDo70YqSQLZL4jYZXpl1U7mYWwKZg5Fxz7r7ZXk31n2\n7HlDCeZmjbMgpSmBnwjAjpxxz9aItCLEze6u4Surpoea1G/v20J4zsqF7OqXoedB\nmYNY/p6vKSc1nwyS50IAEBjc7jQ2nqR9Rh3VO7iemxDbbMH7qrliEY3c+GEtk+HB\niwnsNCbuIWSwAHhGpkX17xZmoSCEDIbwGk3zYaoquiJoZdVemVK9LJhecs3XYy/q\ng85dBges/xoxiGqK60nHb0UirKnvKgl5R1pyTQhXlGKdZo3AX+xIwDP+SxTuoE5R\nfxiF5KFijt8gJ/pgsdQpFShV66YF8zxg+ztly6VeIQKBgQDor6yKp2sdaEowgvGS\nXVYYL8LTeZvLSB+gpDWxMR+9aEaAfJjr21/1T4lVqZlvgCJNOAPW4cTA2lj+vUdp\nZs1Z4BdR+be2WXLZ5NpmRFTNtcF9FHCgaWC11WtPbysL/NG7uY6Wsy4FmhaIl7H0\n7EFyxohTaCmL7hP3AKDZnwXYKwKBgQDPrrJk4oMjQ5QjqdNikUzdg9hTBLHWWAHE\nZFFEN6TZPyJqIoGh/3GTfhlSyKk1D2qDt1atIAPKDXAdBaZ+piJvHkIaxP+nQd+2\nxWTuXWBbeeJNgI8NLnnIttLtX7KakgRSKeri+Jn1auOLbbkMXpPuTYi5UAgJrmhW\nPRn4Y/524QKBgHoIYEJbqYbDwl0M36r2foeyzMfiOH31dnjmhi5G6DGK9aa/MehI\nplveedVOXGUo21SKMyFISMsn+JKpLEGwI7SmHTTl9Z6R7PUv3AbUgXFdiHuT87l9\narYSlvQTBo2D62870vdgQ5u2g2jhvfgIzA5o5uhvcZKsqxXY44Mero7/AoGBAMww\ns97ywgKC5/ykdVv9BfjpL2B4Ri06/AnOpAQRPXgHVdvKL3BKSa29FkLJXWv4yz3T\nnVm8F12qFqfCLW9qAoMD2fSd6cnVv5HgxBqEHj/yNykCFCPepQhNkFaod1733121\nLuaXjC+6NxyX9Y+O0Z1ECABDCpQSMS1RB96q2b6hAoGAdICYn1XaHygxAuSJccB+\nI15AmHUKOSy26zaeDS3TLODqjdD7wwhqHNcs9xVc6AECUrpd2V4oVOIB9rGQ+Jv+\nXzpt2X4iig1trvjPle4GcBHH5Ijs3UO0jX0tZxtOU92IkccJ0uWpNmWPiYWNghm5\n0t2J84mP/Wy2ZUxzAmCX0e8=\n-----END PRIVATE KEY-----\n",
        client_email: "google-drive-jomjom@jom-jom.iam.gserviceaccount.com",
        client_id: "108019534987919593445",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url:
          "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url:
          "https://www.googleapis.com/robot/v1/metadata/x509/google-drive-jomjom%40jom-jom.iam.gserviceaccount.com",
      },
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    const driveService = google.drive({
      version: "v3",
      auth,
    });
    const fileMetaData = {
      name: file.fieldname + "_" + Date.now() + "_" + file.originalname,
      parents: [process.env.GOOGLE_API_FOLDER_ID],
    };
    const media = {
      mimeType: file.mimetype,
      // body: fs.createReadStream(file.path),
      body: bufferToStream(file.buffer),
    };
    const resFile = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      field: "id",
    });

    // Save the file information to the MongoDB database
    const employee = await employeeService.create({
      name: req.body.name,
      salary: req.body.salary,
      role: req.body.role,
      photo: resFile.data.id,
    });
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error);
  }
}

//TODO: Create a employee

module.exports.create = async (req, res) => {
  try {
    await uploadFile(req, res);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// // update employee salary

// const Employee = require("../models/Employee.model");

// const employeeId = "1234567890"; // The ID of the employee to update.

// const newIncrement = {
//   from: new Date("2023-06-01"),
//   salary: 6000,
// };

// Employee.findOneAndUpdate(
//   { _id: employeeId },
//   { $push: { incrementSalary: newIncrement } },
//   { new: true }
// )
//   .then((employee) => {
//     if (employee) {
//       console.log("Employee updated:", employee);
//     } else {
//       console.log("Employee not found.");
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });

module.exports.findAll = async (req, res) => {
  try {
    const getData = await employeeService.findAll().populate("attendance");
    return res.status(200).json(getData);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
};

// module.exports.getById = async (req, res) => {
//   try {
//     const fetchedById = await employeeService
//       .getById(req.params.id)
//       .populate("attendance");
//     return res.status(200).json(fetchedById);
//   } catch (e) {
//     console.error(e);
//     return res.status(400).json(e);
//   }
// };

module.exports.getById = async (req, res) => {
  const yearInt = parseInt(req.query.year);
  const monthInt = parseInt(req.query.month);
  try {
    const fetchedById = await employeeService.getById(req.params.id).populate({
      path: "attendance",
      match: {
        $expr: {
          $and: [
            { $eq: [{ $year: "$date" }, yearInt] },
            { $eq: [{ $month: "$date" }, monthInt] },
          ],
        },
      },
    });
    return res.status(200).json(fetchedById);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
};
