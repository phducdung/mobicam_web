
const cloudinary = require("cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");


cloudinary.v2.config({
    cloud_name: process.env.DINARY_CLOUD_NAME,
    api_key: process.env.DINARY_CLOUD_API_KEY,
    api_secret: process.env.DINARY_CLOUD_API_SECRET
});

// Cấu hình lưu trữ ảnh trên Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: async (req, file) => {
        // Extract file extension
        const fileExt = file.originalname.split('.').pop();
        return {
            folder: 'mobicam',
            format: fileExt,
            public_id: `${Date.now()}-${file.originalname}`
        };
    }
});

const uploadImage = multer({ storage: storage });
module.exports = { uploadImage }