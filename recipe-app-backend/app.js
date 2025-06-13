const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const connectDB = require('./config/db');
connectDB();
const app = express();
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
const exploreRoutes = require('./routes/exploreRoutes');
app.use('/api/explore', exploreRoutes);
const recommendationRoutes = require('./routes/recommendationRoutes');
app.use('/api/recipe/search', recommendationRoutes);
const recipeRoutes = require('./routes/recipeRoutes');
app.use('/api/recipes', recipeRoutes);
const userRoutes = require('./routes/UserRoutes');
app.use('/api/users', userRoutes);
module.exports = app;
