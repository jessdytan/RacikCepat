const Recipe = require('../models/Recipe');

exports.searchRecipes = async (req, res) => {
  try {
    const { ingredients, categories } = req.query;
    
    let query = {};
    
    if (ingredients) {
      const ingredientArray = ingredients.split(',').map(ing => ing.trim());
      query.ingredients = { $all: ingredientArray };
    }
    
    if (categories) {
      const categoryArray = categories.split(',').map(cat => cat.trim());
      query.categories = { $in: categoryArray };
    }
    
    const recipes = await Recipe.find(query)
      .populate('author', 'username')
      .select('-steps');
      
    res.json(recipes);
    console.log(recipes)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};