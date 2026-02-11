/**
 * Database Configuration
 * MongoDB connection setup (for future use)
 */

import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 * @returns {Promise<void>}
 */
export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;

        if (!mongoUri) {
            console.log('⚠️  MongoDB URI not configured. Database features disabled.');
            return;
        }

        const conn = await mongoose.connect(mongoUri);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        // Don't exit - app can still work without DB for GitHub-only features
    }
};

export default connectDB;
