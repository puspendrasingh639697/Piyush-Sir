// // import mongoose from 'mongoose';

// // const addressSchema = new mongoose.Schema({
// //     street: { type: String, required: true },
// //     city: { type: String, required: true },
// //     state: { type: String, required: true },
// //     zipCode: { type: String, required: true },
// //     isDefault: { type: Boolean, default: false }
// // });

// // // models/User.js
// // const userSchema = new mongoose.Schema({
// //     name: { type: String, required: true },
// //     email: { type: String, required: true, unique: true },
// //     password: { type: String, required: true },
// //     phone: { type: String, required: [true, "Phone number is required"] }, // Custom error message
// //     role: { 
// //         type: String, 
// //         default: 'user', 
// //         enum: ['user', 'admin'] 
// //     }, 
// //     addresses: [addressSchema],
// //     wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
// // }, { timestamps: true });

// // export default mongoose.model('User', userSchema);


// // // models/User.js mein save hone se pehle hashing
// // userSchema.pre('save', async function (next) {
// //     if (!this.isModified('password')) {
// //         next();
// //     }
// //     const salt = await bcrypt.genSalt(10);
// //     this.password = await bcrypt.hash(this.password, salt);
// // });


// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const addressSchema = new mongoose.Schema({
//     street: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     zipCode: { type: String, required: true },
//     isDefault: { type: Boolean, default: false }
// });

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phone: { type: String, required: [true, "Phone number is required"] },
//     role: { 
//         type: String, 
//         default: 'user', 
//         enum: ['user', 'admin'] 
//     }, 
//     addresses: [addressSchema],
//     wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    
//     // ✅ 3.4 Shopping Cart Field (Add this)
//     cart: [
//         {
//             productId: { 
//                 type: mongoose.Schema.Types.ObjectId, 
//                 ref: 'Product', 
//                 required: true 
//             },
//             quantity: { 
//                 type: Number, 
//                 default: 1, 
//                 min: [1, "Quantity cannot be less than 1"] 
//             }
//         }
//     ]
// }, { timestamps: true });

// // ✅ Password Hashing (Export se pehle hona chahiye)
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

// // ✅ Password Compare Method (Login mein kaam aayega)
// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// export default mongoose.model('User', userSchema);

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: [true, "Phone number is required"] },
    role: { 
        type: String, 
        default: 'user', 
        enum: ['user', 'admin'] 
    }, 
    addresses: [addressSchema],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    cart: [
        {
            productId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product', 
                required: true 
            },
            quantity: { 
                type: Number, 
                default: 1, 
                min: [1, "Quantity cannot be less than 1"] 
            }
        }
    ]
}, { timestamps: true });

// ✅ Password Compare Method
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);