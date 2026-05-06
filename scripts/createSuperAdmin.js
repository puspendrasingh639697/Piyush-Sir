// backend/scripts/createSuperAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const createSuperAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Database connected');
        
        // Check if super admin already exists
        const existingAdmin = await User.findOne({ role: 'super_admin' });
        
        if (existingAdmin) {
            console.log('⚠️ Super Admin already exists!');
            console.log(`📧 Email: ${existingAdmin.email}`);
            console.log(`👑 Role: ${existingAdmin.role}`);
            process.exit(0);
        }
        
        // Create super admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('SuperAdmin@123', salt);
        
        const superAdmin = new User({
            name: 'Super Admin',
            email: 'superadmin@example.com',
            password: hashedPassword,
            phone: '9999999999',
            role: 'super_admin'
        });
        
        await superAdmin.save();
        
        console.log('✅ Super Admin created successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email: superadmin@example.com');
        console.log('🔑 Password: SuperAdmin@123');
        console.log('👑 Role: super_admin');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 You can now login to admin panel!');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating super admin:', error);
        process.exit(1);
    }
};

createSuperAdmin();