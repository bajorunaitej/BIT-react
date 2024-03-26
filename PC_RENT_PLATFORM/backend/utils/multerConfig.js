const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    const currentTimeStamp = Date.now(); //gaunamas unikalus skaicius pagal dabartinį laiką
    const localName = currentTimeStamp + "-" + file.originalname; //sugeneruojamas uniklaus failo pavadinimas..
    cb(null, localName); //pavadinimas nustatomas, failas išsaugomas
  },
});

const upload = multer({ storage });

module.exports = upload;
