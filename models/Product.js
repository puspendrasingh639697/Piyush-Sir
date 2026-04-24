import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, 
    stock: { type: Number, required: true, default: 0 }, 
    image: { type: String, required: true },
    // models/Product.js mein ye add karo
reviews: [
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
    }
],
numReviews: { type: Number, default: 0 },
rating: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);