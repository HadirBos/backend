const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 60000,
            heartbeatFrequencyMS: 2000,
            retryWrites: true,
            maxPoolSize: 50
        });
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        // Don't exit in production
        if (process.env.NODE_ENV === 'production') {
            console.error('Database connection failed');
        } else {
            process.exit(1);
        }
    }
};

module.exports = connectDB;
