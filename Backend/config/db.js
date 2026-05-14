const mongoose = require("mongoose");

/**
 * Establishes a connection to MongoDB using the URI provided in environment variables.
 * This setup is deployment-ready for services like Render, Heroku, or Atlas.
 */
async function connectDB() {
  try {
    // Uses the MONGO_URI from your .env file locally 
    // or from the Environment Variables dashboard in production.
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Exit process with failure code to prevent the server from running without a DB
    process.exit(1);
  }
}

module.exports = connectDB;