import express from 'express';
import Order from '../models/order.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { items, restaurantId, total, customerName, customerAddress, customerPhone } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ message: 'No items in order' });

    const newOrder = new Order ({
      items,
      restaurantId,
      total,
      customerName,
      customerAddress,
      customerPhone,
    });

    await newOrder.save();

    res.json({ success: true, orderId: newOrder._id });
  } catch (err) {
    console.error('ORder creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;