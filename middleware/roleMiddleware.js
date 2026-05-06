// backend/middleware/roleMiddleware.js

// Restrict access to specific roles
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Access denied. ${req.user.role || 'User'} cannot access this resource`,
                requiredRoles: roles
            });
        }
        
        next();
    };
};

// Check if user is at least minimum role level
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
            return res.status(401).json({ message: 'Not authenticated' });
        }
        
        const userLevel = roleLevel[req.user.role] || 0;
        const requiredLevel = roleLevel[minRole] || 0;
        
        if (userLevel < requiredLevel) {
            return res.status(403).json({ 
                message: `Access denied. Requires ${minRole} or higher role`,
                currentRole: req.user.role,
                requiredMinRole: minRole
            });
        }
        
        next();
    };
};