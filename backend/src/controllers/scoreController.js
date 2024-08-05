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

  try {
    const usernameExists = await Score.findOne({ username });
    if (usernameExists) {
      if (score > usernameExists.score) {
        usernameExists.score = score;
        await usernameExists.save();
        return res.status(201).json(usernameExists); // 200 for successful update
      } else {
        return res.status(201).json(usernameExists); // 200 as the request is successful, but no update was necessary
      }
    } else {
      const newScore = new Score({ username, score });
      await newScore.save();
      return res.status(201).json(newScore); // 201 for successful creation
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

