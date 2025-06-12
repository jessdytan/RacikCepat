const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');


router.post('/', recipeController.createRecipe);


router.get('/', recipeController.getAllRecipes);


router.delete('/:id', recipeController.deleteRecipe);


router.post('/search', recipeController.searchRecipes);


router.get('/:id', recipeController.getRecipeDetail);

module.exports = router;