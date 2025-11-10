const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// POST /api/orders - Create a new order
router.post('/', async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();
  res.status(201).json(newOrder);
});

// GET /api/orders/:id - Get an order by ID
router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user').populate('items.menuItem');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

module.exports = router;