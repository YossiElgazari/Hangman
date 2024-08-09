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

// CORS Configuration
const allowedOrigins = ['https://hangman-frontend.onrender.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // If your frontend needs to send cookies or authentication data
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS configuration
app.use(express.json()); // Parse JSON request bodies

// Route handlers
app.use('/api', scoreRoutes);
app.use('/api', wordRoutes);
app.use('/', (req, res) => {
  res.send('Welcome to Hangman API');
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running at https://hangman-kxt2.onrender.com`);
});

module.exports = { server, app };
