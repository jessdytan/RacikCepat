const Recipe = require('../models/Recipe');

exports.getRecipeDetails = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('author', 'username');
      
    if (!recipe) {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
      
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recipe not found' });
    }
    res.status(500).send('Server Error');
  }
};