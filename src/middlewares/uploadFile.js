const  multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/files");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, file.originalname);
    },
});
const uploadFile = multer({ storage: storage });

module.exports = uploadFile;