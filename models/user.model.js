const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  prenom: { type: String, required: true },
  avatar: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  role: { type: String, enum: ['admin','user'], default: 'user' }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
