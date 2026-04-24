import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // User table se connect karne ke liye
        required: true 
    },
    items: [
        {
            productId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product', // Product table se connect karne ke liye
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true, 
                default: 1 
            }
        }
    ]
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);