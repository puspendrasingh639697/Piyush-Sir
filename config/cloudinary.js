// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import dotenv from 'dotenv';

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// export const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: 'Ram_Cosmetics', // Ye naya folder apne aap ban jayega
//       allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
//     };
//   },
// });


// backend/middleware/uploadMiddleware.js - Cloudinary Version
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'product_images',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
});

const upload = multer({ storage: storage });

export default upload;