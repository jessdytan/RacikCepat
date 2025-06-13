const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');


router.post('/', recipeController.createRecipe);


router.get('/', recipeController.getRecipes);

router.delete('/:id', recipeController.deleteRecipe);

router.post('/search', recipeController.searchRecipes);

router.get('/:id', recipeController.getRecipeDetail);

router.put('/:id', recipeController.updateRecipe);

module.exports = router;