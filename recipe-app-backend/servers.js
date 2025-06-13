const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

// Initialize Express app
const app = express();

// CORS options
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Static folder
app.use('/uploads', express.static('uploads'));

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API routes
const exploreRoutes = require('./routes/exploreRoutes');
app.use('/api/explore', exploreRoutes);

const recommendationRoutes = require('./routes/recommendationRoutes');
app.use('/api/recipe/search', recommendationRoutes);

const recipeRoutes = require('./routes/recipeRoutes');
app.use('/api/recipes', recipeRoutes);

const userRoutes = require('./routes/UserRoutes');
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
