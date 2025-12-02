import Order from '../models/order.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    res.json(orders);
  } catch (err) {
    console.error('getOrders error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { items, restaurantId, total, customerName, customerAddress, customerPhone } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }
    if (typeof total !== 'number') {
      return res.status(400).json({ message: 'Invalid total' });
    }

    const newOrder = new Order({
      items,
      restaurantId,
      total,
      customerName,
      customerAddress,
      customerPhone,
    });

    await newOrder.save();
    res.status(201).json({ success: true, orderId: newOrder._id });
  } catch (err) {
    console.error('createOrder error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};