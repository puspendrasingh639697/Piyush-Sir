// backend/middleware/validationMiddleware.js
import mongoose from 'mongoose';

// ✅ Product Validation
export const validateProduct = (req, res, next) => {
    const { name, description, price, category, stock } = req.body;
    const errors = [];
    
    // Name validation
    if (!name || name.trim().length < 3) {
        errors.push('Product name must be at least 3 characters');
    }
    if (name && name.length > 100) {
        errors.push('Product name cannot exceed 100 characters');
    }
    
    // Description validation
    if (!description || description.trim().length < 10) {
        errors.push('Description must be at least 10 characters');
    }
    if (description && description.length > 2000) {
        errors.push('Description cannot exceed 2000 characters');
    }
    
    // Price validation
    if (!price) {
        errors.push('Price is required');
    } else if (isNaN(price) || Number(price) <= 0) {
        errors.push('Price must be a positive number');
    } else if (Number(price) > 1000000) {
        errors.push('Price cannot exceed 10,00,000');
    }
    
    // Category validation
    const validCategories = [
        'Copper Utensils', 
        'Steel Bottles', 
        'Thermoware & Lunchboxes', 
        'Cookware Sets', 
        'Home Appliances', 
        'Cookers'
    ];
    if (!category) {
        errors.push('Category is required');
    } else if (!validCategories.includes(category)) {
        errors.push(`Category must be one of: ${validCategories.join(', ')}`);
    }
    
    // Stock validation
    if (stock === undefined || stock === null) {
        errors.push('Stock is required');
    } else if (isNaN(stock) || !Number.isInteger(Number(stock)) || Number(stock) < 0) {
        errors.push('Stock must be a non-negative integer');
    } else if (Number(stock) > 99999) {
        errors.push('Stock cannot exceed 99,999');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ 
            success: false, 
            errors: errors,
            message: 'Validation failed'
        });
    }
    
    // Sanitize inputs - remove HTML tags
    req.body.name = name.trim().replace(/[<>]/g, '');
    req.body.description = description.trim().replace(/[<>]/g, '');
    req.body.price = Number(price);
    req.body.stock = Number(stock);
    
    next();
};

// ✅ User Registration Validation
export const validateUser = (req, res, next) => {
    const { name, email, password, phone } = req.body;
    const errors = [];
    
    // Name validation
    if (!name || name.trim().length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    if (name && name.length > 50) {
        errors.push('Name cannot exceed 50 characters');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Password validation
    if (!password) {
        errors.push('Password is required');
    } else if (password.length < 6) {
        errors.push('Password must be at least 6 characters');
    } else if (password.length > 50) {
        errors.push('Password cannot exceed 50 characters');
    }
    
    // Phone validation (optional but if provided must be valid)
    const phoneRegex = /^[0-9]{10}$/;
    if (phone && !phoneRegex.test(phone)) {
        errors.push('Phone number must be 10 digits');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ 
            success: false, 
            errors: errors,
            message: 'Validation failed'
        });
    }
    
    // Sanitize
    req.body.email = email.toLowerCase().trim();
    req.body.name = name.trim();
    
    next();
};

// ✅ Address Validation
export const validateAddress = (req, res, next) => {
    const { street, city, state, zipCode } = req.body;
    const errors = [];
    
    if (!street || street.trim().length < 3) {
        errors.push('Street address must be at least 3 characters');
    }
    
    if (!city || city.trim().length < 2) {
        errors.push('City is required');
    }
    
    if (!state || state.trim().length < 2) {
        errors.push('State is required');
    }
    
    const zipRegex = /^[0-9]{6}$/;
    if (!zipCode || !zipRegex.test(zipCode)) {
        errors.push('Zip code must be 6 digits');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ 
            success: false, 
            errors: errors,
            message: 'Address validation failed'
        });
    }
    
    next();
};

// ✅ ID Validation for MongoDB ObjectId
export const validateId = (req, res, next) => {
    const { id, addressId, productId, orderId, userId } = req.params;
    const idToCheck = id || addressId || productId || orderId || userId;
    
    if (idToCheck && !mongoose.Types.ObjectId.isValid(idToCheck)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid ID format' 
        });
    }
    
    next();
};

// ✅ Order Validation
export const validateOrder = (req, res, next) => {
    const { orderItems, shippingAddress, paymentMethod } = req.body;
    const errors = [];
    
    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
        errors.push('At least one item is required in order');
    }
    
    if (orderItems && orderItems.length > 50) {
        errors.push('Cannot order more than 50 items at once');
    }
    
    // Validate each order item
    if (orderItems && Array.isArray(orderItems)) {
        orderItems.forEach((item, index) => {
            if (!item.productId) {
                errors.push(`Item ${index + 1}: Product ID is required`);
            }
            if (!item.quantity || item.quantity < 1) {
                errors.push(`Item ${index + 1}: Quantity must be at least 1`);
            }
        });
    }
    
    if (!shippingAddress || !shippingAddress.address || !shippingAddress.city) {
        errors.push('Complete shipping address is required');
    }
    
    const validPaymentMethods = ['COD', 'Razorpay', 'Card', 'UPI'];
    if (!paymentMethod || !validPaymentMethods.includes(paymentMethod)) {
        errors.push(`Payment method must be one of: ${validPaymentMethods.join(', ')}`);
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ 
            success: false, 
            errors: errors,
            message: 'Order validation failed'
        });
    }
    
    next();
};

// ✅ Login Validation
export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Valid email is required');
    }
    
    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ 
            success: false, 
            errors: errors,
            message: 'Login validation failed'
        });
    }
    
    next();
};