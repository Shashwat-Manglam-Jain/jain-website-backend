const mongoose = require('mongoose');

let isConnected = false;

async function dbconnection() {
  if (isConnected) {
    console.log("✅ MongoDB already connected.");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log(`✅ MongoDB connected at: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit the app if DB fails
  }
}

module.exports = dbconnection;
