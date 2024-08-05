const Word = require('../models/wordModel');

exports.getWord = async (req, res) => {
    // Function to select a random element from an array
    const random = (options) => options[Math.floor(Math.random() * options.length)];
    
    const { category, difficulty } = req.query;

    // Select difficulty and category, defaulting to random if not provided
    const selectedDifficulty = difficulty === 'random' || !difficulty ? random(['easy', 'medium', 'hard']) : difficulty;
    const selectedCategory = category === 'random' || !category ? random(['Animals', 'Countries', 'Fruits', 'Food']) : category;

    try {
        // Aggregate words matching the selected difficulty and category, pick a random one, and project desired fields
        const word = await Word.aggregate([
            { $match: { difficulty: selectedDifficulty, category: selectedCategory } },
            { $sample: { size: 1 } },
            { $project: { _id: 0, difficulty: 1, category: 1, word: 1, hint: 1 } }
        ]);
        res.status(200).json(word[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
