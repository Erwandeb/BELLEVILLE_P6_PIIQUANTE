const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, process.env.IMAGEDIR);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    callback(null, name);
  },
});

module.exports = multer({ storage: storage }).single("image");