const express = require('express');
const { getScores, addScore } = require('../controllers/scoreController');
const validateUsername = require('../middlewares/validateUsername');

const router = express.Router();

router.get('/scores', getScores);
router.post('/scores', validateUsername, addScore);

module.exports = router;
