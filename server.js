// // // // // import express from 'express';
// // // // // import dotenv from 'dotenv';
// // // // // import cors from 'cors';
// // // // // import connectDB from './config/db.js';
// // // // // import authRoutes from './routes/authRoutes.js';
// // // // // import productRoutes from './routes/productRoutes.js';
// // // // // import cartRoutes from './routes/cartRoutes.js';
// // // // // import orderRoutes from './routes/orderRoutes.js';
// // // // // import paymentRoutes from './routes/paymentRoutes.js'
// // // // // import couponRoutes from './routes/couponRoutes.js';
// // // // // import userRoutes from "./routes/userRoutes.js";
// // // // // import adminRoutes from './routes/adminRoutes.js'
// // // // // import contentRoutes from './routes/contentRoutes.js';
// // // // // import notificationRoutes from './routes/notificationRoutes.js';


// // // // // // Configuration load karo
// // // // // dotenv.config();

// // // // // // App initialize
// // // // // const app = express();

// // // // // // Middleware: JSON aur CORS handle karne ke liye
// // // // // app.use(express.json());
// // // // // app.use(express.urlencoded({ extended: true }));
// // // // // app.use(cors());

// // // // // // Database connection function call
// // // // // connectDB();
// // // // // app.use('/api/auth', authRoutes);
// // // // // app.use('/api/products', productRoutes); 
// // // // // app.use('/api/cart', cartRoutes);
// // // // // app.use('/api/orders', orderRoutes);
// // // // // app.use('/api/payment', paymentRoutes);
// // // // // app.use('/api/coupon', couponRoutes);
// // // // // app.use("/api/user", userRoutes);
// // // // // app.use('/api/admin', adminRoutes);
// // // // // app.use('/api/content', contentRoutes);
// // // // // app.use('/api/notifications', notificationRoutes);





// // // // // // Test Route: Check karne ke liye ki backend zinda hai
// // // // // app.get('/', (req, res) => {
// // // // //     res.send("🚀 Backend is running like a pro!");
// // // // // });

// // // // // // Port settings
// // // // // const PORT = process.env.PORT || 5000;
// // // // // app.listen(PORT, () => console.log(`🔥 Server started on port ${PORT}`));


// // // // import express from 'express';
// // // // import dotenv from 'dotenv';
// // // // import cors from 'cors';
// // // // import connectDB from './config/db.js';
// // // // import authRoutes from './routes/authRoutes.js';
// // // // import productRoutes from './routes/productRoutes.js';
// // // // import cartRoutes from './routes/cartRoutes.js';
// // // // import orderRoutes from './routes/orderRoutes.js';
// // // // import paymentRoutes from './routes/paymentRoutes.js'
// // // // import couponRoutes from './routes/couponRoutes.js';
// // // // import userRoutes from "./routes/userRoutes.js";
// // // // import adminRoutes from './routes/adminRoutes.js'
// // // // import contentRoutes from './routes/contentRoutes.js';
// // // // import notificationRoutes from './routes/notificationRoutes.js';

// // // // // Configuration load karo
// // // // dotenv.config();

// // // // // App initialize
// // // // const app = express();

// // // // // ✅ CORS FIX - Simplified for Express 4.x
// // // // app.use(cors({
// // // //     origin: true,  // Reflects request origin
// // // //     credentials: true,
// // // //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// // // //     allowedHeaders: ['Content-Type', 'Authorization']
// // // // }));

// // // // // Middleware: JSON aur URL encoded data handle karne ke liye
// // // // app.use(express.json());
// // // // app.use(express.urlencoded({ extended: true }));

// // // // // Database connection function call
// // // // connectDB();

// // // // // Routes
// // // // app.use('/api/auth', authRoutes);
// // // // app.use('/api/products', productRoutes); 
// // // // app.use('/api/cart', cartRoutes);
// // // // app.use('/api/orders', orderRoutes);
// // // // app.use('/api/payment', paymentRoutes);
// // // // app.use('/api/coupon', couponRoutes);
// // // // app.use("/api/user", userRoutes);
// // // // app.use('/api/admin', adminRoutes);
// // // // app.use('/api/content', contentRoutes);
// // // // app.use('/api/notifications', notificationRoutes);

// // // // // Test Route: Check karne ke liye ki backend zinda hai
// // // // app.get('/', (req, res) => {
// // // //     res.send("🚀 Backend is running like a pro!");
// // // // });

// // // // // Port settings
// // // // const PORT = process.env.PORT || 5000;
// // // // app.listen(PORT, () => console.log(`🔥 Server started on port ${PORT}`));

// // // // server.js (jo tune diya hai - sahi hai, kuch change nahi)
// // // import express from 'express';
// // // import path from 'path';
// // // import { fileURLToPath } from 'url';
// // // import dotenv from 'dotenv';
// // // import cors from 'cors';
// // // import connectDB from './config/db.js';
// // // import authRoutes from './routes/authRoutes.js';
// // // import productRoutes from './routes/productRoutes.js';
// // // import cartRoutes from './routes/cartRoutes.js';
// // // import orderRoutes from './routes/orderRoutes.js';
// // // import paymentRoutes from './routes/paymentRoutes.js'
// // // import couponRoutes from './routes/couponRoutes.js';
// // // import userRoutes from "./routes/userRoutes.js";
// // // import adminRoutes from './routes/adminRoutes.js'
// // // import contentRoutes from './routes/contentRoutes.js';
// // // import notificationRoutes from './routes/notificationRoutes.js';

// // // // Configuration load 

// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);
// // // dotenv.config();

// // // // App initialize
// // // const app = express();

// // // // CORS setup
// // // app.use(cors({
// // //     origin: true,
// // //     credentials: true,
// // //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// // //     allowedHeaders: ['Content-Type', 'Authorization']
// // // }));

// // // // Middleware
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));

// // // // Database connection
// // // connectDB();

// // // // Routes - Sab sahi se connected hain
// // // app.use('/api/auth', authRoutes);
// // // app.use('/api/products', productRoutes); 
// // // app.use('/api/cart', cartRoutes);
// // // app.use('/api/orders', orderRoutes);
// // // app.use('/api/payment', paymentRoutes);
// // // app.use('/api/coupon', couponRoutes);
// // // app.use("/api/user", userRoutes);
// // // app.use('/api/admin', adminRoutes);
// // // app.use('/api/content', contentRoutes);
// // // app.use('/api/notifications', notificationRoutes);
// // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // // Test Route
// // // app.get('/', (req, res) => {
// // //     res.send("🚀 Backend is running like a pro!");
// // // });

// // // // Port settings
// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => console.log(`🔥 Server started on port ${PORT}`));
// // // backend/server.js
// // import express from 'express';
// // import path from 'path';
// // import { fileURLToPath } from 'url';
// // import dotenv from 'dotenv';
// // import cors from 'cors';
// // import connectDB from './config/db.js';

// // // Routes
// // import authRoutes from './routes/authRoutes.js';
// // import productRoutes from './routes/productRoutes.js';
// // import cartRoutes from './routes/cartRoutes.js';
// // import orderRoutes from './routes/orderRoutes.js';
// // import paymentRoutes from './routes/paymentRoutes.js';
// // import couponRoutes from './routes/couponRoutes.js';
// // import userRoutes from "./routes/userRoutes.js";
// // import adminRoutes from './routes/adminRoutes.js';
// // import contentRoutes from './routes/contentRoutes.js';
// // import notificationRoutes from './routes/notificationRoutes.js';

// // // ✅ Security Middleware Imports
// // import {
// //     securityHeaders,
// //     noSqlSanitize,
// //     xssProtection,
// //     limiter,
// //     authLimiter,
// //     sanitizeQueryParams,
// //     sanitizeBody,
// //     preventParameterPollution,
// //     requireJsonContent
// // } from './middleware/securityMiddleware.js';

// // // Configuration
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);
// // dotenv.config();

// // // App initialize
// // const app = express();

// // // =======================
// // //   🔒 SECURITY MIDDLEWARE (Order Matters!)
// // // =======================

// // // 1. Security Headers (Helmet)
// // app.use(securityHeaders);

// // // 2. CORS setup
// // app.use(cors({
// //     origin: true,
// //     credentials: true,
// //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// //     allowedHeaders: ['Content-Type', 'Authorization']
// // }));

// // // 3. Global Rate Limiting (100 requests per 15 minutes)
// // app.use(limiter);

// // // 4. NoSQL Injection Protection
// // app.use(noSqlSanitize);

// // // 5. XSS Protection
// // app.use(xssProtection);

// // // 6. Query Parameter Sanitizer
// // app.use(sanitizeQueryParams);

// // // 7. Body Parser
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // 8. Body Data Sanitizer (After body parser)
// // app.use(sanitizeBody);

// // // 9. Prevent Parameter Pollution
// // app.use(preventParameterPollution);

// // // =======================
// // //   STATIC FILES
// // // =======================
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // =======================
// // //   DATABASE CONNECTION
// // // =======================
// // connectDB();

// // // =======================
// // //   ROUTES
// // // =======================
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

// // // =======================
// // //   HEALTH CHECK
// // // =======================
// // app.get('/', (req, res) => {
// //     res.json({
// //         status: 'OK',
// //         message: '🚀 Backend is running with full security!',
// //         timestamp: new Date().toISOString()
// //     });
// // });

// // // =======================
// // //   404 Handler
// // // =======================
// // app.use((req, res) => {
// //     res.status(404).json({
// //         success: false,
// //         message: `Route ${req.originalUrl} not found`
// //     });
// // });

// // // =======================
// // //   Global Error Handler
// // // =======================
// // app.use((err, req, res, next) => {
// //     console.error('❌ Error:', err.message);
    
// //     // Don't leak error details in production
// //     const message = process.env.NODE_ENV === 'production' 
// //         ? 'Internal server error' 
// //         : err.message;
    
// //     res.status(err.status || 500).json({
// //         success: false,
// //         message: message
// //     });
// // });

// // // =======================
// // //   PORT SETTINGS
// // // =======================
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //     console.log(`🔥 Server started on port ${PORT}`);
// //     console.log(`🔒 Security: Helmet | NoSQL | XSS | RateLimit | Sanitize`);
// // });

// // backend/server.js
// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db.js';

// // Routes
// import authRoutes from './routes/authRoutes.js';
// import productRoutes from './routes/productRoutes.js';
// import cartRoutes from './routes/cartRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';
// import couponRoutes from './routes/couponRoutes.js';
// import userRoutes from "./routes/userRoutes.js";
// import adminRoutes from './routes/adminRoutes.js';
// import contentRoutes from './routes/contentRoutes.js';
// import notificationRoutes from './routes/notificationRoutes.js';

// // ✅ Security Middleware Imports
// import {
//     securityHeaders,
//     noSqlSanitize,
//     xssProtection,
//     globalLimiter,
//     authLimiter,
//     adminLimiter,
//     sanitizeQueryParams,
//     sanitizeBody,
//     preventParameterPollution,
//     requestSizeLimiter,
//     preventSqlInjection
// } from './middleware/securityMiddleware.js';

// // Configuration
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config();

// // App initialize
// const app = express();

// // =======================
// //   🔒 SECURITY MIDDLEWARE (Order Matters!)
// // =======================

// // 1. Security Headers (Helmet) - MUST BE FIRST
// app.use(securityHeaders);

// // 2. CORS setup with strict options
// app.use(cors({
//     origin: function(origin, callback) {
//         const allowedOrigins = [
//             'http://localhost:5173',
//             'http://localhost:5174',
//             'https://yourdomain.com',
//             'https://admin.yourdomain.com'
//         ];
        
//         // Allow requests with no origin (like mobile apps or curl)
//         if (!origin) return callback(null, true);
        
//         if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//     exposedHeaders: ['Content-Range', 'X-Content-Range'],
//     maxAge: 600
// }));

// // 3. Request Size Limiter (10MB limit)
// app.use(requestSizeLimiter);

// // 4. Global Rate Limiting (100 requests per 15 minutes)
// app.use(globalLimiter);

// // 5. NoSQL Injection Protection
// app.use(noSqlSanitize);

// // 6. XSS Protection
// app.use(xssProtection);

// // 7. SQL Injection Prevention
// app.use(preventSqlInjection);

// // 8. Query Parameter Sanitizer
// app.use(sanitizeQueryParams);

// // 9. Body Parser
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // 10. Body Data Sanitizer (After body parser)
// app.use(sanitizeBody);

// // 11. Prevent Parameter Pollution
// app.use(preventParameterPollution);

// // =======================
// //   STATIC FILES
// // =======================
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // =======================
// //   DATABASE CONNECTION
// // =======================
// connectDB();

// // =======================
// //   ROUTES with Additional Rate Limiting
// // =======================

// // Apply strict rate limit to auth routes (5 attempts per 15 min)
// app.use('/api/auth/login', authLimiter);
// app.use('/api/auth/register', authLimiter);
// app.use('/api/user/login', authLimiter);
// app.use('/api/user/register', authLimiter);

// // Apply admin rate limit to admin routes (500 requests per hour)
// app.use('/api/admin', adminLimiter);
// app.use('/api/products/add', adminLimiter);
// app.use('/api/products/update', adminLimiter);
// app.use('/api/products/delete', adminLimiter);

// // Public Routes
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

// // =======================
// //   HEALTH CHECK
// // =======================
// app.get('/', (req, res) => {
//     res.json({
//         success: true,
//         status: 'OK',
//         message: '🚀 Backend is running with full security!',
//         timestamp: new Date().toISOString(),
//         security: {
//             headers: '✅ Helmet',
//             nosql: '✅ mongoSanitize',
//             xss: '✅ xss-clean',
//             rateLimit: '✅ Enabled',
//             cors: '✅ Strict',
//             sqlInjection: '✅ Protected'
//         }
//     });
// });

// // =======================
// //   404 Handler
// // =======================
// app.use((req, res) => {
//     res.status(404).json({
//         success: false,
//         message: `Route ${req.originalUrl} not found`,
//         timestamp: new Date().toISOString()
//     });
// });

// // =======================
// //   Global Error Handler
// // =======================
// app.use((err, req, res, next) => {
//     console.error('❌ Error:', err.message);
//     console.error('Stack:', err.stack);
    
//     // Don't leak error details in production
//     const message = process.env.NODE_ENV === 'production' 
//         ? 'Internal server error. Please try again later.' 
//         : err.message;
    
//     const statusCode = err.status || 500;
    
//     res.status(statusCode).json({
//         success: false,
//         message: message,
//         ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
//         timestamp: new Date().toISOString()
//     });
// });

// // =======================
// //   PORT SETTINGS
// // =======================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`\n🔥 Server started on port ${PORT}`);
//     console.log(`🔒 Security Features:`);
//     console.log(`   ✅ Helmet (Security Headers)`);
//     console.log(`   ✅ NoSQL Injection Protection`);
//     console.log(`   ✅ XSS Protection`);
//     console.log(`   ✅ SQL Injection Protection`);
//     console.log(`   ✅ Rate Limiting (Global/Auth/Admin)`);
//     console.log(`   ✅ Request Size Limiter (10MB)`);
//     console.log(`   ✅ Parameter Pollution Prevention`);
//     console.log(`   ✅ Input Sanitization`);
//     console.log(`   ✅ Strict CORS`);
//     console.log(`\n📡 Server is ready to accept requests!\n`);
// });


// backend/server.js - Updated
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from './routes/adminRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

// ✅ Security Middleware Imports (without xss-clean)
import {
    securityHeaders,
    noSqlSanitize,
    // xssProtection,  // ❌ Commented out - causing issues
    globalLimiter,
    authLimiter,
    adminLimiter,
    sanitizeQueryParams,
    sanitizeBody,
    preventParameterPollution,
    requestSizeLimiter,
    preventSqlInjection
} from './middleware/securityMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

// ✅ Trust proxy - Required for Render.com rate limiting
app.set('trust proxy', 1);

// =======================
//   🔒 SECURITY MIDDLEWARE
// =======================

app.use(securityHeaders);

app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(requestSizeLimiter);
app.use(globalLimiter);
app.use(noSqlSanitize);
// app.use(xssProtection); // ❌ REMOVED - causing Cannot set property query error
app.use(preventSqlInjection);
app.use(sanitizeQueryParams);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeBody);
app.use(preventParameterPollution);

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database
connectDB();

// Routes
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

// Rate limiting for specific routes
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/user/login', authLimiter);
app.use('/api/user/register', authLimiter);
app.use('/api/admin', adminLimiter);

// Health check
app.get('/', (req, res) => {
    res.json({
        success: true,
        status: 'OK',
        message: '🚀 Backend is running!',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    
    const message = process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : err.message;
    
    res.status(err.status || 500).json({
        success: false,
        message: message
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🔥 Server started on port ${PORT}`);
});