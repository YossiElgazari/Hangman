const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const scoreRoutes = require('./routes/scoreRoutes');
const dontenv = require('dotenv');
const wordRoutes = require('./routes/wordRoutes');

const app = express();
const port = process.env.PORT;

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Route handlers
app.use('/api', scoreRoutes);
app.use('/api', wordRoutes);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running at https://hangman-kxt2.onrender.com`);
});

module.exports = { server, app };
