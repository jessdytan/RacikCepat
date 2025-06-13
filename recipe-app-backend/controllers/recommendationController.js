const Recipe = require('../models/Recipe');

exports.getResepByRecommendations = async (req, res) => {
  try {
    const { recommendations } = req.body;

    if (!Array.isArray(recommendations)) {
      return res.status(400).json({ message: 'Recommendations harus berupa array.' });
    }

    // Cari semua resep yang judulnya cocok persis
    const resepList = await Recipe.find({
      judul: { $in: recommendations }
    });

    res.json(resepList);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Gagal mengambil resep.' });
  }
};
