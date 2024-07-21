const express = require('express');
const { getScores, addScore } = require('../controllers/scoreController');

const router = express.Router();

router.get('/scores', getScores);
router.post('/scores', addScore);

module.exports = router;
