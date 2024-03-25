const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    // const currentTimeStamp = Date.now();
    // cb(null, currentTimeStamp + "-" + file.filename);
    console.log("File created");
    cb(null, "sssd.jpg");
  },
});

const upload = multer({ storage });

module.exports = upload;
