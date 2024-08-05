const express = require('express');
const { getScores, addScore } = require('../controllers/scoreController');
const validateUsername = require('../middlewares/validateUsername');

const router = express.Router();

// Route to get the scores
router.get('/scores', getScores);

// Route to add a score, with username validation middleware
router.post('/scores', validateUsername, addScore);

module.exports = router;
