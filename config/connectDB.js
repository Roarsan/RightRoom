const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Error connecting to database:", err);
    process.exit(1);
  }
}

module.exports = connectDB;
