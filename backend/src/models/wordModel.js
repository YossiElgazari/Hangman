const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  category: { type: String, required: true },
  word: { type: String, required: true },
  difficulty: { type: String, required: true },
  hint: { type: String, required: true }
});

module.exports = mongoose.model('Word', wordSchema);
