// backend/middleware/securityMiddleware.js
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';

// ✅ 1. Helmet - Security Headers (Enhanced)
export const securityHeaders = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            imgSrc: ["'self'", "data:", "https:", "blob:", "https://res.cloudinary.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            connectSrc: ["'self'", "https://*.cloudinary.com"],
            frameAncestors: ["'none'"],
            formAction: ["'self'"],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    frameguard: { action: 'deny' },
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
});

// ✅ 2. NoSQL Injection Protection
export const noSqlSanitize = mongoSanitize({
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
        console.warn(`⚠️ NoSQL injection attempt detected on field: ${key}`);
    }
});

// ✅ 3. XSS Protection
export const xssProtection = xss();

// ✅ 4. Parameter Pollution Prevention
export const preventParameterPollution = hpp();

// ✅ 5. Global Rate Limiting
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per 15 minutes
    message: {
        success: false,
        message: 'Too many requests from this IP. Please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
});

// ✅ 6. Strict rate limit for auth routes
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // Only 5 attempts per 15 minutes
    skipSuccessfulRequests: true,
    message: {
        success: false,
        message: 'Too many login attempts. Please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// ✅ 7. Strict rate limit for admin routes
export const adminLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 500, // 500 requests per hour for admin
    message: {
        success: false,
        message: 'Too many admin requests. Please slow down.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// ✅ 8. API rate limit for products
export const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 30, // 30 requests per minute
    message: {
        success: false,
        message: 'Too many requests. Please wait a moment.'
    },
});

// ✅ 9. Request Size Limiter
export const requestSizeLimiter = (req, res, next) => {
    const contentLength = parseInt(req.headers['content-length']) || 0;
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (contentLength > maxSize) {
        return res.status(413).json({
            success: false,
            message: 'Request entity too large. Maximum size is 10MB.'
        });
    }
    next();
};

// ✅ 10. Query Parameter Sanitizer
export const sanitizeQueryParams = (req, res, next) => {
    if (req.query) {
        Object.keys(req.query).forEach(key => {
            if (typeof req.query[key] === 'string') {
                req.query[key] = req.query[key]
                    .replace(/[<>$&'"]/g, '')
                    .trim();
            }
        });
    }
    next();
};

// ✅ 11. Body Data Sanitizer
export const sanitizeBody = (req, res, next) => {
    const sanitize = (obj) => {
        if (!obj) return obj;
        
        if (typeof obj === 'string') {
            return obj
                .replace(/<[^>]*>/g, '')
                .replace(/javascript:/gi, '')
                .replace(/on\w+=/gi, '')
                .replace(/[<>$&'"]/g, '')
                .trim();
        }
        
        if (Array.isArray(obj)) {
            return obj.map(item => sanitize(item));
        }
        
        if (typeof obj === 'object' && obj !== null) {
            const sanitized = {};
            for (const [key, value] of Object.entries(obj)) {
                sanitized[key] = sanitize(value);
            }
            return sanitized;
        }
        
        return obj;
    };
    
    req.body = sanitize(req.body);
    next();
};

// ✅ 12. Check for SQL injection patterns
export const preventSqlInjection = (req, res, next) => {
    const sqlPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE)\b)/i;
    
    const checkValue = (value) => {
        if (typeof value === 'string' && sqlPattern.test(value)) {
            return true;
        }
        return false;
    };
    
    // Check query params
    for (const key in req.query) {
        if (checkValue(req.query[key])) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request parameters detected.'
            });
        }
    }
    
    // Check body
    for (const key in req.body) {
        if (checkValue(req.body[key])) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request body detected.'
            });
        }
    }
    
    next();
};

// ✅ 13. IP Whitelist for Super Admin (Optional)
export const ipWhitelist = (allowedIPs) => {
    return (req, res, next) => {
        const clientIp = req.ip || req.connection.remoteAddress;
        if (allowedIPs.includes(clientIp)) {
            next();
        } else {
            res.status(403).json({
                success: false,
                message: 'Access denied from this IP address.'
            });
        }
    };
};

// ✅ 14. Content Type Checker
export const requireJsonContent = (req, res, next) => {
    if (!req.is('application/json') && req.method !== 'GET' && req.method !== 'DELETE') {
        return res.status(415).json({
            success: false,
            message: 'Content-Type must be application/json'
        });
    }
    next();
};