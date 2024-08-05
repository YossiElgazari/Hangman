const express = require('express');
const { getWord } = require('../controllers/wordController');

const router = express.Router();

// Route to get a word
router.get('/word', getWord);

module.exports = router;
