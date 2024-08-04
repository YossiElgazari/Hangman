const express = require('express');
const { getWord } = require('../controllers/wordController');

const router = express.Router();

router.get('/word', getWord);

module.exports = router;
