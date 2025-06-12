const mongoose = require('mongoose');

const BahanSchema = new mongoose.Schema({
  grup: String,
  jumlah: String,
  bahan: String,
}, { _id: false });

const RecipeSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  foto: { type: String },
  penulis: { type: String },
  porsi: { type: String },
  bahan: [BahanSchema],
  langkah: [String],
  durasi: { type: String },
  url: { type: String },
  tag: [String],
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);