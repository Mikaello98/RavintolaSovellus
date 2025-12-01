import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  items: [
    {
      _id: String,
      name: String,
      price, Number,
      quantity: Number,
    }
  ],
  restaurantId: String,
  total: Number,
  customerName: String,
  customerAddress: String,
  customerPhone: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model('Order', OrderSchema);