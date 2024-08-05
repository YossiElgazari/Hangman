const mongoose = require('mongoose');

// Define the schema for the score model
const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
});

// Create the Score model using the defined schema
const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
