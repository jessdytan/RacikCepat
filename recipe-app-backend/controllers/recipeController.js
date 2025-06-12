const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res) => {
  try {
    const {
      judul,
      foto,
      penulis,
      porsi,
      bahan,
      langkah,
      durasi,
      url,
      tag
    } = req.body;

    const newRecipe = new Recipe({
      judul,
      foto,
      penulis,
      porsi,
      bahan,
      langkah,
      durasi,
      url,
      tag
    });

    await newRecipe.save();
    res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create recipe', error: error.message });
  }
};
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data resep', error: error.message });
  }
};
exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Recipe.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Resep tidak ditemukan' });
    }
    res.json({ message: 'Resep berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus resep', error: error.message });
  }
};
exports.searchRecipes = async (req, res) => {
  try {
    const { ingredients } = req.body; 
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ message: 'Bahan harus diisi.' });
    }
    const allRecipes = await Recipe.find();
    const normalize = str => str.trim().toLowerCase();
    const fullMatch = allRecipes.filter(recipe => {
      const recipeIngredients = (recipe.bahan || []).map(b => normalize(b.bahan));
      return ingredients.every(input => recipeIngredients.includes(normalize(input)));
    });

    if (fullMatch.length > 0) {
      return res.json({ type: 'full', recipes: fullMatch });
    }

   
    const partialMatch = allRecipes
      .map(recipe => {
        const recipeIngredients = (recipe.bahan || []).map(b => normalize(b.bahan));
        const matchedIngredients = ingredients.filter(input => recipeIngredients.includes(normalize(input)));
        return matchedIngredients.length > 0
          ? { ...recipe.toObject(), matchedIngredients }
          : null;
      })
      .filter(Boolean);

    if (partialMatch.length > 0) {
      return res.json({ type: 'partial', recipes: partialMatch });
    }

  
    return res.json({ type: 'none', recipes: [] });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mencari resep', error: error.message });
  }
};

exports.getRecipeDetail = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Resep tidak ditemukan' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil detail resep', error: error.message });
  }
};