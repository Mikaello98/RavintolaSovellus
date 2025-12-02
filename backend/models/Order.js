import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  items: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      quantity: { type: Number, required: true, min: 1 },
    }
  ],
  restaurantId: { type: String },
  total: { type: Number, required: true, min: 0 },
  customerName: { type: String },
  customerAddress: { type: String },
  customerPhone: { type: String },
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);