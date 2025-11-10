const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItems');

//GET all menu items for a restaurant: /api/menuItems?restaurantId=12345
router.get('/', async (req, res) => {
  const { restaurantId } = req.query;
  const filter = restaurantId ? { restaurant: restaurantId } : {};
  const menuItems = await MenuItem.find(filter);
  res.json(menuItems);
});

//GET a specific menu item by ID: /api/menuItems/:id
router.get('/:id', async (req, res) => {
  const menuItem = await MenuItem.findById(req.params.id);
  if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
  res.json(menuItem);
});

module.exports = router;