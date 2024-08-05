const Score = require('../models/scoreModel');

exports.getScores = async (req, res) => {
  try {
    // Aggregate the scores by username, find the highest score for each user,
    // sort the results in descending order, limit to top 10, and project the desired fields
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
    res.status(200).json({ scores });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addScore = async (req, res) => {
  const { username, score } = req.body;

  try {
    // Check if the username already exists in the database
    const usernameExists = await Score.findOne({ username });
    if (usernameExists) {
      // If the new score is higher, update the existing score
      if (score > usernameExists.score) {
        usernameExists.score = score;
        await usernameExists.save();
        return res.status(201).json(usernameExists); 
      } else {
        // If the new score is not higher, return the existing score
        return res.status(201).json(usernameExists); 
      }
    } else {
      // If the username does not exist, create a new score entry
      const newScore = new Score({ username, score });
      await newScore.save();
      return res.status(201).json(newScore); 
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
