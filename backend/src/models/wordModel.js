const mongoose = require('mongoose');

// Define the schema for the word model
const wordSchema = new mongoose.Schema({
  category: { type: String, required: true },   // Category of the word
  word: { type: String, required: true },       // The actual word
  difficulty: { type: String, required: true }, // Difficulty level of the word
  hint: { type: String, required: true }        // Hint for the word
});

// Create and export the Word model using the defined schema
module.exports = mongoose.model('Word', wordSchema);
