// import multer from 'multer';
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import dotenv from 'dotenv';

// dotenv.config();

// // 1. Cloudinary ko Configure karo
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // 2. Cloudinary Storage Setup
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'product_images', // Cloudinary par is naam ka folder ban jayega
//         allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
//     },
// });

// const upload = multer({ storage: storage });

// export default upload;


// backend/middleware/uploadMiddleware.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Local storage (NO Cloudinary)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'));
    }
};

const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: fileFilter
});

export default upload;