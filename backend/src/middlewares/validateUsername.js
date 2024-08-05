const {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers
} = require('obscenity');

// Initialize the profanity matcher with the English dataset and recommended transformers
const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

const validateUsername = (req, res, next) => {
  const { username } = req.body;

  // Check if username is provided
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  // Check if username contains profanity
  if (matcher.hasMatch(username)) {
    return res.status(400).json({ message: 'Username contains inappropriate language' });
  }

  // Check if username meets the length and character requirements
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({ message: 'Username must be 3-20 characters long and contain only letters, numbers, and underscores' });
  }

  // Proceed to the next middleware or route handler if validation passes
  next();
};

module.exports = validateUsername;
