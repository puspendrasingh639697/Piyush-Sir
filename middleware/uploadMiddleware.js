// backend/middleware/uploadMiddleware.js
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'product_images',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
});

const upload = multer({ storage: storage });

// ✅ YEH FUNCTION ADD KARO - Cloudinary URL return karne ke liye
export const getImageUrl = (req) => {
    if (req.file && req.file.path) {
        return req.file.path;  // Cloudinary returns full URL
    }
    return null;
};

export default upload;