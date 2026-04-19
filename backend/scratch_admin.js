const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/UserModel');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const email = 'admin@admin.com';
        const password = '3';
        const name = 'System Admin';

        let user = await User.findOne({ email });

        if (user) {
            console.log('User exists. Updating to Admin...');
            user.password = password; 
            user.isAdmin = true;
            await user.save();
        } else {
            console.log('User not found. Creating new Admin...');
            user = await User.create({
                name,
                email,
                password,
                isAdmin: true
            });
        }

        console.log('Admin user ready:', user.email);
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createAdmin();
