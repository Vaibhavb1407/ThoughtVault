const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./models/User');
const Thought = require('./models/Thought');

const verifyData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const users = await User.find({}).select('-password');
        console.log('\n--- USERS ---');
        console.log(JSON.stringify(users, null, 2));

        const thoughts = await Thought.find({});
        console.log('\n--- THOUGHTS ---');
        console.log(JSON.stringify(thoughts, null, 2));

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

verifyData();
