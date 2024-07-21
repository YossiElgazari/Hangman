const express = require('express');
const router = express.Router();
const { getWord } = require('../controllers/wordController');

router.get('/word', getWord);

module.exports = router;
