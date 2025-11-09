const mongoose = require('mongoose');
const avisSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true }
}, { timestamps: true });
module.exports = mongoose.model('Avis', avisSchema);
