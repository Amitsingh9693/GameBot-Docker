require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to databases
connectDB();
connectRedis();

// Routes
app.use('/api', recommendationRoutes);

// Root route
app.use('/', (req, res) => {
    res.send("Backend is running")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
