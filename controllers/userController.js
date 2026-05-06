// import User from "../models/User.js";

// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const generateToken = (id) => {
//     // Ye function user ki ID lega aur use JWT secret ke saath sign karega
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: "30d", // Token 30 din tak valid rahegi
//     });
// };

// // @desc    Get user profile data
// // @route   GET /api/user/profile
// export const getUserProfile = async (req, res) => {
//     try {
//         // req.user humein protect middleware se mil raha hai
//         const user = await User.findById(req.user._id).select("-password");
//         if (user) {
//             res.json(user);
//         } else {
//             res.status(404).json({ message: "User not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };

// // @desc    Update profile details
// // @route   PUT /api/user/profile
// export const updateUserProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id);

//         if (user) {
//             user.name = req.body.name || user.name;
//             user.phone = req.body.phone || user.phone;
//             user.address = req.body.address || user.address;
            
//             // Password change option (Optional)
//             if (req.body.password) {
//                 user.password = req.body.password;
//             }

//             const updatedUser = await user.save();
//             res.json({
//                 success: true,
//                 message: "Profile updated!",
//                 user: {
//                     _id: updatedUser._id,
//                     name: updatedUser.name,
//                     email: updatedUser.email,
//                     phone: updatedUser.phone,
//                     address: updatedUser.address
//                 }
//             });
//         } else {
//             res.status(404).json({ message: "User not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Update failed", error: error.message });
//     }
// };



// // 1. Add New Address
// export const addAddress = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // 1. Naya address push karo
//         user.addresses.push(req.body);

//         // 2. SAVE karte waqt validation skip karo 
//         // Isse 'phone required' wali error bypass ho jayegi
//         await user.save({ validateBeforeSave: false });

//         res.status(201).json(user.addresses);
//     } catch (err) {
//         console.error("Error adding address:", err);
//         res.status(500).json({ message: "Server Error", error: err.message });
//     }
// };

// // 2. Edit Address
// export const updateAddress = async (req, res) => {
//     try {
//         const { addressId } = req.params; // URL se ID li
//         const user = await User.findById(req.user.id);

//         if (!user) return res.status(404).json({ message: "User not found" });

//         // User ke addresses mein se wo wali ID wala address dhoondo
//         const address = user.addresses.id(addressId);

//         if (!address) {
//             return res.status(404).json({ message: "Address not found" });
//         }

//         // Jo data user ne bheja hai sirf wahi update karo
//         address.street = req.body.street || address.street;
//         address.city = req.body.city || address.city;
//         address.state = req.body.state || address.state;
//         address.zipCode = req.body.zipCode || address.zipCode;

//         // Save with validation off
//         await user.save({ validateBeforeSave: false });

//         res.json({ 
//             message: "Address updated successfully", 
//             addresses: user.addresses 
//         });
//     } catch (err) {
//         console.error("Update Error:", err.message);
//         res.status(500).json({ message: "Update failed", error: err.message });
//     }
// };
// // 3. Delete Address
// export const deleteAddress = async (req, res) => {
//     try {
//         const { addressId } = req.params; // URL se ID nikali
        
//         const user = await User.findById(req.user.id);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         // Mongoose ka pull method use karke array se delete karo
//         user.addresses.pull(addressId); 

//         // Save karte waqt validation off rakho (jaise add mein kiya tha)
//         await user.save({ validateBeforeSave: false });

//         res.json({ 
//             message: "Address deleted successfully", 
//             addresses: user.addresses 
//         });
//     } catch (err) {
//         console.error("Delete Error:", err.message);
//         res.status(500).json({ 
//             message: "Delete failed", 
//             error: err.message 
//         });
//     }
// };

// // Pehle se bane functions ke niche ye copy-paste kar do
// export const getAddresses = async (req, res) => {
//     try {
//         // req.user.id humein authMiddleware (protect) se mil rahi hai
//         const user = await User.findById(req.user.id);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // User ke andar jo addresses array hai wo bhej do
//         res.status(200).json(user.addresses);
//     } catch (err) {
//         console.error("Error fetching addresses:", err);
//         res.status(500).json({ message: "Server Error", error: err.message });
//     }
// };

// // export const registerUser = async (req, res) => {
// //     const { name, email, password, phone, adminSecret } = req.body;

// //     const userExists = await User.findOne({ email });
// //     if (userExists) return res.status(400).json({ message: "User already exists" });

// //     // --- YEH WALA PART ADD KARO ---
// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);
// //     // ------------------------------

// //     let role = 'user';
// //     if (adminSecret === process.env.ADMIN_SECRET_KEY) {
// //         role = 'admin';
// //     }

// //     const user = await User.create({
// //         name,
// //         email,
// //         password: hashedPassword, // <--- Ab hashed password jayega
// //         phone,
// //         role
// //     });

// //     if (user) {
// //         res.status(201).json({
// //             _id: user._id,
// //             name: user.name,
// //             email: user.email,
// //             role: user.role,
// //             token: generateToken(user._id)
// //         });
// //     }
// // };


// // controllers/userController.js mein ye function add karo



// // export const loginUser = async (req, res) => {
// //     const { email, password } = req.body;

// //     try {
// //         // 1. Check karo email aur password body mein aa rahe hain ya nahi
// //         if (!email || !password) {
// //             return res.status(400).json({ message: "Please provide email and password" });
// //         }

// //         const user = await User.findOne({ email });

// //         // 2. Check karo user database mein mila ya nahi
// //         if (!user) {
// //             return res.status(401).json({ message: "Invalid email or password" });
// //         }

// //         // 3. Bcrypt compare (Safe check)
// //         const isMatch = await bcrypt.compare(password, user.password);

// //         if (isMatch) {
// //             res.json({
// //                 _id: user._id,
// //                 name: user.name,
// //                 email: user.email,
// //                 role: user.role,
// //                 token: generateToken(user._id)
// //             });
// //         } else {
// //             res.status(401).json({ message: "Invalid email or password" });
// //         }
// //     } catch (error) {
// //         // Yahi error tumhe aa rahi thi "Illegal arguments"
// //         res.status(500).json({ message: "Server Error", error: error.message });
// //     }
// // };
// export const registerUser = async (req, res) => {
//     const { name, email, password, phone, adminSecret } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: "User already exists" });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     let role = 'user';
//     if (adminSecret === process.env.ADMIN_SECRET_KEY) {
//         role = 'admin';
//     }

//     const user = await User.create({
//         name,
//         email,
//         password: hashedPassword,
//         phone,
//         role
//     });

//     if (user) {
//         // ✅ FIX: Add isAdmin field
//         const isAdmin = user.role === 'admin' || user.role === 'super_admin';
        
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             isAdmin: isAdmin,        // ✅ Added
//             token: generateToken(user._id)
//         });
//     }
// };

// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         if (!email || !password) {
//             return res.status(400).json({ message: "Please provide email and password" });
//         }

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (isMatch) {
//             // ✅ FIX: Add isAdmin for frontend compatibility
//             const isAdmin = user.role === 'admin' || user.role === 'super_admin';
            
//             res.json({
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//                 isAdmin: isAdmin,        // ✅ Add this line
//                 token: generateToken(user._id)
//             });
//         } else {
//             res.status(401).json({ message: "Invalid email or password" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };

// // ✅ CORRECT - No 'next' parameter
// // ✅ Make sure NO 'next' parameter here
// export const toggleWishlist = async (req, res) => {
//     try {
        
        
//         const user = await User.findById(req.user._id);
//         const { productId } = req.body;

//         if (!user) {
//             return res.status(404).json({ message: "User nahi mila" });
//         }

//         if (!productId) {
//             return res.status(400).json({ message: "Product ID is required" });
//         }

//         if (user.wishlist.includes(productId)) {
//             user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
//             await user.save();
//             return res.status(200).json({ 
//                 success: true, 
//                 message: "Removed from Wishlist ❤️",
//                 wishlist: user.wishlist 
//             });
//         } else {
//             user.wishlist.push(productId);
//             await user.save();
//             return res.status(200).json({ 
//                 success: true, 
//                 message: "Added to Wishlist 😍",
//                 wishlist: user.wishlist 
//             });
//         }
//     } catch (error) {
//         console.error("❌ Wishlist Error:", error);
//         return res.status(500).json({ 
//             success: false, 
//             message: error.message 
//         });
//     }
// };

// export const getWishlist = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id).populate('wishlist', 'name price image');
//         res.json({ success: true, wishlist: user.wishlist });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
// // ISI TARAH REGISTER BHI ADD KAR DENA AGAR MISSING HAI


import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// =======================
//   AUTH ROUTES
// =======================

export const registerUser = async (req, res) => {
    const { name, email, password, phone, adminSecret } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let role = 'user';
        if (adminSecret === process.env.ADMIN_SECRET_KEY) {
            role = 'admin';
        }

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role
        });

        if (user) {
            const isAdmin = user.role === 'admin' || user.role === 'super_admin';
            
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isAdmin: isAdmin,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const isAdmin = user.role === 'admin' || user.role === 'super_admin';
            
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                isAdmin: isAdmin,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// =======================
//   PROFILE ROUTES
// =======================

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.phone = req.body.phone || user.phone;
            
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();
            res.json({
                success: true,
                message: "Profile updated!",
                user: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    phone: updatedUser.phone,
                    role: updatedUser.role
                }
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};

// =======================
//   ADDRESS ROUTES
// =======================

export const getAddresses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.addresses);
    } catch (err) {
        console.error("Error fetching addresses:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

export const addAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.addresses.push(req.body);
        await user.save({ validateBeforeSave: false });

        res.status(201).json(user.addresses);
    } catch (err) {
        console.error("Error adding address:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

export const updateAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        const address = user.addresses.id(addressId);

        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        address.street = req.body.street || address.street;
        address.city = req.body.city || address.city;
        address.state = req.body.state || address.state;
        address.zipCode = req.body.zipCode || address.zipCode;

        await user.save({ validateBeforeSave: false });

        res.json({ 
            message: "Address updated successfully", 
            addresses: user.addresses 
        });
    } catch (err) {
        console.error("Update Error:", err.message);
        res.status(500).json({ message: "Update failed", error: err.message });
    }
};

export const deleteAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.addresses.pull(addressId);
        await user.save({ validateBeforeSave: false });

        res.json({ 
            message: "Address deleted successfully", 
            addresses: user.addresses 
        });
    } catch (err) {
        console.error("Delete Error:", err.message);
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
};

// =======================
//   WISHLIST ROUTES
// =======================

export const toggleWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { productId } = req.body;

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        if (user.wishlist.includes(productId)) {
            user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
            await user.save();
            return res.status(200).json({ 
                success: true, 
                message: "Removed from Wishlist",
                wishlist: user.wishlist 
            });
        } else {
            user.wishlist.push(productId);
            await user.save();
            return res.status(200).json({ 
                success: true, 
                message: "Added to Wishlist",
                wishlist: user.wishlist 
            });
        }
    } catch (error) {
        console.error("Wishlist Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist', 'name price image stock');
        res.json({ success: true, wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// =======================
//   ADMIN ROUTES (RBAC)
// =======================

// ✅ Get all users (Admin+)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Update user role (Only Super Admin)
export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        
        const validRoles = ['user', 'admin', 'super_admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }
        
        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Cannot change super_admin if requester is not super_admin
        if (user.role === 'super_admin' && req.user.role !== 'super_admin') {
            return res.status(403).json({ message: 'Cannot modify Super Admin user' });
        }
        
        user.role = role;
        await user.save();
        
        res.json({ 
            success: true,
            message: 'User role updated successfully', 
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Delete user (Only Super Admin)
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Cannot delete super_admin
        if (user.role === 'super_admin') {
            return res.status(403).json({ message: 'Cannot delete Super Admin user' });
        }
        
        await user.deleteOne();
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};