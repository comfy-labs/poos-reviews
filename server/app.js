const express = require("express");
const multer = require('multer');
const ejs = require('ejs');
const path = require("path");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

const app = express();
const port = 5000;

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.post('/upload-dick-pics', (req, res) => {
  res.render('upload');
  console.log('You did it!');
})
  .get('/', (req, res) => {
    res.render('index');
    console.log("index again...");
  });


app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});



// handle route to server toilet clusters
app.get("/images/toiletCluster/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(`images/toiletCluster/${imageName}`, { root: __dirname });
});


// app.use(express.static(path.join(__dirname, "build")));

// start server
app.listen(port, () => console.log(`Poos app listening on port ${port}!`));
