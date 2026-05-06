import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createSuperAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Database connected');
        
        // Delete existing if any (to avoid duplicate)
        await User.deleteOne({ email: 'superadmin@example.com' });
        
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
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

createSuperAdmin();