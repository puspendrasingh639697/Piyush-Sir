
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import crypto from 'crypto';

// ✅ Store invalidated tokens
const invalidatedTokens = new Set();

// ✅ Generate Access Token
export const generateAccessToken = (userId) => {
    return jwt.sign(
        { id: userId, type: 'access' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// ✅ Generate Refresh Token
export const generateRefreshToken = (userId) => {
    return jwt.sign(
        { id: userId, type: 'refresh', tokenId: crypto.randomBytes(16).toString('hex') },
        process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// ✅ PROTECT - Check if user is logged in
export const protect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        
        // Check if token is invalidated
        if (invalidatedTokens.has(token)) {
            return res.status(401).json({ 
                success: false, 
                message: 'Token invalidated. Please login again.' 
            });
        }
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            if (decoded.type !== 'access') {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Invalid token type' 
                });
            }
            
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'User not found' 
                });
            }
            
            // Check if account is active
            if (req.user.isActive === false) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Account is disabled. Contact admin.' 
                });
            }
            
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Token expired. Please refresh.' 
                });
            }
            return res.status(401).json({ 
                success: false, 
                message: 'Not authorized' 
            });
        }
    }
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Not authorized, no token' 
        });
    }
};

// ✅ ADMIN ONLY - Backward compatibility (same as restrictTo('admin', 'super_admin'))
export const adminOnly = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'super_admin')) {
        next();
    } else {
        res.status(403).json({ 
            success: false, 
            message: 'Not authorized as admin' 
        });
    }
};

// ✅ RESTRICT TO - Role-based access control
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Not authenticated' 
            });
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                message: `Access denied. ${req.user.role} cannot access this resource`,
                requiredRoles: roles
            });
        }
        
        next();
    };
};

// ✅ MINIMUM ROLE REQUIRED
export const minRole = (minRole) => {
    const roleLevel = {
        'super_admin': 5,
        'admin': 4,
        'manager': 3,
        'editor': 2,
        'viewer': 1,
        'user': 0
    };
    
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Not authenticated' 
            });
        }
        
        const userLevel = roleLevel[req.user.role] || 0;
        const requiredLevel = roleLevel[minRole] || 0;
        
        if (userLevel < requiredLevel) {
            return res.status(403).json({ 
                success: false, 
                message: `Access denied. Requires ${minRole} or higher`,
                currentRole: req.user.role
            });
        }
        
        next();
    };
};

// ✅ Refresh Token Handler
export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
        return res.status(401).json({ 
            success: false, 
            message: 'Refresh token required' 
        });
    }
    
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET);
        
        if (decoded.type !== 'refresh') {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token type' 
            });
        }
        
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'User not found' 
            });
        }
        
        const newAccessToken = generateAccessToken(user._id);
        const newRefreshToken = generateRefreshToken(user._id);
        
        res.json({
            success: true,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });
        
    } catch (error) {
        res.status(401).json({ 
            success: false, 
            message: 'Invalid or expired refresh token' 
        });
    }
};

// ✅ Logout - Invalidate token
export const logout = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
        invalidatedTokens.add(token);
        setTimeout(() => invalidatedTokens.delete(token), 24 * 60 * 60 * 1000);
    }
    
    res.json({ 
        success: true, 
        message: 'Logged out successfully' 
    });
};