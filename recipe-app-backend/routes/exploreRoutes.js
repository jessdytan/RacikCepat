const express = require('express');
const router = express.Router();
const exploreController = require('../controllers/exploreController');

// @route   GET /api/explore
// @desc    Search recipes by ingredients and categories
// @access  Public
router.get('/', exploreController.searchRecipes);

module.exports = router;