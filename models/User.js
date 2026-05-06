
// // import mongoose from 'mongoose';
// // import bcrypt from 'bcryptjs';

// // const addressSchema = new mongoose.Schema({
// //     street: { type: String, required: true },
// //     city: { type: String, required: true },
// //     state: { type: String, required: true },
// //     zipCode: { type: String, required: true },
// //     isDefault: { type: Boolean, default: false }
// // });

// // const userSchema = new mongoose.Schema({
// //     name: { type: String, required: true },
// //     email: { type: String, required: true, unique: true },
// //     password: { type: String, required: true },
// //     phone: { type: String, required: [true, "Phone number is required"] },
// //     role: { 
// //         type: String, 
// //         default: 'user', 
// //         enum: ['user', 'admin', 'super_admin']  // ✅ Super Admin Add Karo
// //     }, 
// //     addresses: [addressSchema],
// //     wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
// //     cart: [
// //         {
// //             productId: { 
// //                 type: mongoose.Schema.Types.ObjectId, 
// //                 ref: 'Product', 
// //                 required: true 
// //             },
// //             quantity: { 
// //                 type: Number, 
// //                 default: 1, 
// //                 min: [1, "Quantity cannot be less than 1"] 
// //             }
// //         }
// //     ]
// // }, { timestamps: true });
// // // const userSchema = new mongoose.Schema({
// // //     name: { type: String, required: true },
// // //     email: { type: String, required: true, unique: true },
// // //     password: { type: String, required: true },
// // //     phone: { type: String, required: [true, "Phone number is required"] },
// // //     role: { 
// // //         type: String, 
// // //         default: 'user', 
// // //         enum: ['user', 'admin'] 
// // //     }, 
// // //     addresses: [addressSchema],
// // //     wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
// // //     cart: [
// // //         {
// // //             productId: { 
// // //                 type: mongoose.Schema.Types.ObjectId, 
// // //                 ref: 'Product', 
// // //                 required: true 
// // //             },
// // //             quantity: { 
// // //                 type: Number, 
// // //                 default: 1, 
// // //                 min: [1, "Quantity cannot be less than 1"] 
// // //             }
// // //         }
// // //     ]
// // // }, { timestamps: true });

// // // ✅ Password Compare Method
// // userSchema.methods.matchPassword = async function (enteredPassword) {
// //     return await bcrypt.compare(enteredPassword, this.password);
// // };

// // export default mongoose.model('User', userSchema);

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
//         enum: ['user', 'admin', 'super_admin']
//     },
//     addresses: [addressSchema],
//     wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
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

// // ✅ Password Compare Method
// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// export default mongoose.model('User', userSchema);

// backend/models/User.js
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
    // =======================
    //   BASIC INFORMATION
    // =======================
    name: { 
        type: String, 
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [50, "Name cannot exceed 50 characters"]
    },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"]
    },
    password: { 
        type: String, 
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    phone: { 
        type: String, 
        required: [true, "Phone number is required"],
        match: [/^[0-9]{10}$/, "Phone number must be 10 digits"]
    },
    
    // =======================
    //   ROLE & PERMISSIONS
    // =======================
    role: { 
        type: String, 
        default: 'user', 
        enum: ['user', 'admin', 'super_admin']
    },
    
    // =======================
    //   ADDRESSES
    // =======================
    addresses: [addressSchema],
    
    // =======================
    //   WISHLIST & CART
    // =======================
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
                min: [1, "Quantity cannot be less than 1"],
                max: [99, "Quantity cannot exceed 99"]
            }
        }
    ],
    
    // =======================
    //   🔒 SECURITY FIELDS (ADD THESE)
    // =======================
    lastLogin: { 
        type: Date, 
        default: null 
    },
    failedLoginAttempts: { 
        type: Number, 
        default: 0 
    },
    isLocked: { 
        type: Boolean, 
        default: false 
    },
    lockUntil: { 
        type: Date, 
        default: null 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    passwordChangedAt: { 
        type: Date, 
        default: null 
    },
    passwordResetToken: { 
        type: String, 
        default: null 
    },
    passwordResetExpires: { 
        type: Date, 
        default: null 
    },
    
    // =======================
    //   EMAIL VERIFICATION
    // =======================
    isEmailVerified: { 
        type: Boolean, 
        default: false 
    },
    emailVerificationToken: { 
        type: String, 
        default: null 
    },
    emailVerificationExpires: { 
        type: Date, 
        default: null 
    }
    
}, { timestamps: true });

// =======================
//   🔒 PASSWORD METHODS
// =======================

// ✅ Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordChangedAt = Date.now();
    next();
});

// ✅ Compare entered password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Check if password was changed after token issued
userSchema.methods.isPasswordChangedAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

// ✅ Increment failed login attempts
userSchema.methods.incrementFailedLoginAttempts = async function() {
    this.failedLoginAttempts += 1;
    
    // Lock account after 10 failed attempts
    if (this.failedLoginAttempts >= 10) {
        this.isLocked = true;
        this.lockUntil = Date.now() + 30 * 60 * 1000; // Lock for 30 minutes
    }
    
    await this.save();
};

// ✅ Reset failed login attempts
userSchema.methods.resetFailedLoginAttempts = async function() {
    this.failedLoginAttempts = 0;
    this.isLocked = false;
    this.lockUntil = null;
    await this.save();
};

// ✅ Check if account is locked
userSchema.methods.isAccountLocked = function() {
    if (this.isLocked && this.lockUntil > Date.now()) {
        return true;
    }
    // Auto unlock if lock period expired
    if (this.isLocked && this.lockUntil <= Date.now()) {
        this.isLocked = false;
        this.lockUntil = null;
        this.save();
        return false;
    }
    return false;
};

// ✅ Generate password reset token
userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    return resetToken;
};

// ✅ Generate email verification token
userSchema.methods.createEmailVerificationToken = function() {
    const verificationToken = crypto.randomBytes(32).toString('hex');
    this.emailVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
    this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    return verificationToken;
};

export default mongoose.model('User', userSchema);