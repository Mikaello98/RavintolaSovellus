import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  imageUrl: String,
}, { timestamps: true });

export default mongoose.model('Restaurant', restaurantSchema);