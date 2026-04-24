// // // import jwt from 'jsonwebtoken';
// // // import User from '../models/User.js';

// // // export const protect = async (req, res, next) => {
// // //     let token;
// // //     // Check karo ki header mein 'Bearer token' hai ya nahi
// // //     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
// // //         try {
// // //             token = req.headers.authorization.split(' ')[1];
// // //             const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
// // //             // User ka data request object mein daal do
// // //             req.user = await User.findById(decoded.id).select('-password');
// // //             next(); // Agle step par jane do
// // //         } catch (error) {
// // //             res.status(401).json({ message: "Not authorized, token failed" });
// // //         }
// // //     }

// // //     if (!token) {
// // //         res.status(401).json({ message: "No token, no entry!" });
// // //     }
// // // };

// // // // Sirf Admin ke liye check
// // // export const adminOnly = (req, res, next) => {
// // //     // isAdmin ki jagah role === 'admin' check karo
// // //     if (req.user && req.user.role === 'admin') {
// // //         next();
// // //     } else {
// // //         res.status(403).json({ message: "Sirf Admin hi ye kaam kar sakta hai!" });
// // //     }
// // // };


// // import jwt from 'jsonwebtoken';
// // import User from '../models/User.js';

// // export const protect = async (req, res, next) => {
// //     console.log("--- STEP 1: Protect Middleware Hit ---");
// //     let token;

// //     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
// //         try {
// //             token = req.headers.authorization.split(' ')[1];
// //             console.log("Token received:", token ? "Yes" : "No");

// //             const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //             console.log("Decoded ID:", decoded.id);

// //             req.user = await User.findById(decoded.id).select('-password');
            
// //             if (!req.user) {
// //                 console.log("User not found in DB");
// //                 return res.status(401).json({ message: "User not found" });
// //             }

// //             console.log("User attached to req, calling next()...");
// //             return next(); // <--- Yahan se bahar nikalna zaroori hai!

// //         } catch (error) {
// //             console.log("Token Verification Error:", error.message);
// //             return res.status(401).json({ message: "Not authorized, token failed" });
// //         }
// //     }

// //     if (!token) {
// //         console.log("No token found in headers");
// //         return res.status(401).json({ message: "No token, no entry!" });
// //     }
// // };

// // // 3. Sirf Admin ke liye check
// // export const adminOnly = (req, res, next) => {
// //     // Role check (Jo tumne kaha tha: role === 'admin')
// //     if (req.user && req.user.role === 'admin') {
// //         next();
// //     } else {
// //         res.status(403).json({ 
// //             success: false, 
// //             message: "Sirf Admin hi ye kaam kar sakta hai!" 
// //         });
// //     }
// // };

// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const protect = async (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             req.user = await User.findById(decoded.id).select('-password');
            
//             if (!req.user) {
//                 return res.status(401).json({ message: "User not found" });
//             }

//             return next(); // Agle middleware (adminOnly) par bhejo
//         } catch (error) {
//             return res.status(401).json({ message: "Not authorized, token failed" });
//         }
//     }

//     if (!token) {
//         return res.status(401).json({ message: "No token, no entry!" });
//     }
// };

// // Sirf Admin ke liye check
// export const adminOnly = (req, res, next) => {
//     // Agar request yahan tak aayi hai, toh req.user protect middleware se mil chuka hai
//     if (req.user && req.user.role === 'admin') {
//         return next(); // Controller function par bhejo
//     } else {
//         return res.status(403).json({ 
//             success: false, 
//             message: "Sirf Admin hi ye kaam kar sakta hai!" 
//         });
//     }
// };

// // 🚨 Sabse Zaruri Line:
// // Agar kisi file mein tune galti se 'admin' likha hai, toh ye crash hone se bachayega
// export const admin = adminOnly;

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;
    
    

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }
            
            // ✅ FIX: Check if next exists
            if (next && typeof next === 'function') {
                next();
            } else {
                return res.status(200).json({ message: "Authenticated", user: req.user });
            }
            
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "No token, no entry!" });
    }
};

export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        if (next && typeof next === 'function') {
            next();
        } else {
            return res.status(200).json({ message: "Admin access granted" });
        }
    } else {
        return res.status(403).json({ 
            success: false, 
            message: "Sirf Admin hi ye kaam kar sakta hai!" 
        });
    }
};