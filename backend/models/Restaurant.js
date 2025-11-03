const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  address: String,
  image: String,
  categories: [String],
  rating: { type: Number, min: 0, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);