import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    type: { 
        type: String, 
        required: true, 
        unique: true,
        enum: ['banner', 'about', 'contact', 'policy'] // Ye categories hain
    },
    title: { type: String }, // Page ka heading
    body: { type: String },  // Page ka poora text (About us/Policy ke liye)
    imageUrl: { type: String }, // Banner image ka link (Cloudinary)
    link: { type: String }    // Banner pe click kare toh kahan jaye
}, { timestamps: true });

export default mongoose.model('Content', contentSchema);