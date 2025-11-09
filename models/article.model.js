const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: String,
  category: String,
  brand: String,
  price: Number,
  status: { type: Boolean, default: true },
  stock: Number,
  img: { type: String, required: true },
  img1: String,
  img2: String,
  img3: String,
  img4: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  avis: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Avis' }]
}, { timestamps: true });
module.exports = mongoose.model('Article', articleSchema);
