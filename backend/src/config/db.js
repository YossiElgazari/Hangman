const mongoose = require('mongoose');
require('dotenv').config();

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Connect to the MongoDB database using the connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
