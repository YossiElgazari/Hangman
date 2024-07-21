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
app.use(cors());
app.use(express.json());

app.use('/api', scoreRoutes);
app.use('/api', wordRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
