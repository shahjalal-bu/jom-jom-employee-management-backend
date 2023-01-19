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
      keyFile: "./googledriveapi.json",
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

module.exports.findAll = async (req, res) => {
  try {
    const getData = await employeeService.findAll().populate("attendance");
    return res.status(200).json(getData);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const fetchedById = await employeeService
      .getById(req.params.id)
      .populate("attendance");
    return res.status(200).json(fetchedById);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
};
