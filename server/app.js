const express = require("express");
const multer = require("multer");
const path = require("path");
const uuidv4 = require("uuid/v4");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("image");

// Check File Type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  const error = mimetype && extname ? null : new Error("Error: Images Only!");
  const passed = mimetype && extname;

  cb(error, passed);
}

const app = express();
const port = 5000;

app.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.status(500).send({ error: err });
    } else if (req.file === undefined) {
      res.status(400).send({ error: "Error: No File Selected" });
    } else {
      res.status(200).send({
        message: "File Uploaded",
        file: `uploads/${req.file.filename}`
      });
    }
  });
});

// start server
app.listen(port, () => console.log(`Poos app listening on port ${port}!`));
