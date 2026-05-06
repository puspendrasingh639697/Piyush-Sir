// // import express from 'express';
// // import dotenv from 'dotenv';
// // import cors from 'cors';
// // import connectDB from './config/db.js';
// // import authRoutes from './routes/authRoutes.js';
// // import productRoutes from './routes/productRoutes.js';
// // import cartRoutes from './routes/cartRoutes.js';
// // import orderRoutes from './routes/orderRoutes.js';
// // import paymentRoutes from './routes/paymentRoutes.js'
// // import couponRoutes from './routes/couponRoutes.js';
// // import userRoutes from "./routes/userRoutes.js";
// // import adminRoutes from './routes/adminRoutes.js'
// // import contentRoutes from './routes/contentRoutes.js';
// // import notificationRoutes from './routes/notificationRoutes.js';


// // // Configuration load karo
// // dotenv.config();

// // // App initialize
// // const app = express();

// // // Middleware: JSON aur CORS handle karne ke liye
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// // app.use(cors());

// // // Database connection function call
// // connectDB();
// // app.use('/api/auth', authRoutes);
// // app.use('/api/products', productRoutes); 
// // app.use('/api/cart', cartRoutes);
// // app.use('/api/orders', orderRoutes);
// // app.use('/api/payment', paymentRoutes);
// // app.use('/api/coupon', couponRoutes);
// // app.use("/api/user", userRoutes);
// // app.use('/api/admin', adminRoutes);
// // app.use('/api/content', contentRoutes);
// // app.use('/api/notifications', notificationRoutes);





// // // Test Route: Check karne ke liye ki backend zinda hai
// // app.get('/', (req, res) => {
// //     res.send("🚀 Backend is running like a pro!");
// // });

// // // Port settings
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`🔥 Server started on port ${PORT}`));


// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db.js';
// import authRoutes from './routes/authRoutes.js';
// import productRoutes from './routes/productRoutes.js';
// import cartRoutes from './routes/cartRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js'
// import couponRoutes from './routes/couponRoutes.js';
// import userRoutes from "./routes/userRoutes.js";
// import adminRoutes from './routes/adminRoutes.js'
// import contentRoutes from './routes/contentRoutes.js';
// import notificationRoutes from './routes/notificationRoutes.js';

// // Configuration load karo
// dotenv.config();

// // App initialize
// const app = express();

// // ✅ CORS FIX - Simplified for Express 4.x
// app.use(cors({
//     origin: true,  // Reflects request origin
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Middleware: JSON aur URL encoded data handle karne ke liye
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Database connection function call
// connectDB();

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes); 
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/payment', paymentRoutes);
// app.use('/api/coupon', couponRoutes);
// app.use("/api/user", userRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/content', contentRoutes);
// app.use('/api/notifications', notificationRoutes);

// // Test Route: Check karne ke liye ki backend zinda hai
// app.get('/', (req, res) => {
//     res.send("🚀 Backend is running like a pro!");
// });

// // Port settings
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🔥 Server started on port ${PORT}`));

// server.js (jo tune diya hai - sahi hai, kuch change nahi)
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'
import couponRoutes from './routes/couponRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from './routes/adminRoutes.js'
import contentRoutes from './routes/contentRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

// Configuration load 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

// App initialize
const app = express();

// CORS setup
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Routes - Sab sahi se connected hain
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/coupon', couponRoutes);
app.use("/api/user", userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test Route
app.get('/', (req, res) => {
    res.send("🚀 Backend is running like a pro!");
});

// Port settings
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server started on port ${PORT}`));