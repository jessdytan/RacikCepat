const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendationController");

// @route   GET /api/recommendations/:id
// @desc    Get recipe details by ID
// @access  Public
router.get("/:id", recommendationController.getRecipeDetails);

module.exports = router;
