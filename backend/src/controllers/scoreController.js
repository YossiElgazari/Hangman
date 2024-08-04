const Score = require('../models/scoreModel');

exports.getScores = async (req, res) => {
  try {
    const scores = await Score.aggregate([
      {
        $group: {
          _id: "$username",
          highestScore: { $max: "$score" }
        }
      },
      {
        $sort: { highestScore: -1 }
      },
      {
        $limit: 10
      },
      {
        $project: {
          _id: 0,
          username: "$_id",
          score: "$highestScore"
        }
      }
    ]);
    res.status(200).json({scores});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addScore = async (req, res) => {
  const { username, score } = req.body;
  const usernameExists = await Score.findOne({ username });
  if (usernameExists) {
    if (score > usernameExists.score) {
      usernameExists.score = score;
      try {
        await usernameExists.save();
        res.status(201).json(usernameExists);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    } else {
      res.status(201).json(usernameExists);
    }
    return;
  }
};
