const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// GET /restaurants - Get all restaurants
router.get('/', async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

// GET /restaurants/:id - Get a restaurant by ID
router.get('/:id', async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  });

  // POST /restaurants - Create a new restaurant (admin only)
  router.post('/', async (req, res) => {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  });

  // PUT /restaurants/:id - Update a restaurant by ID (admin only)
  router.put('/:id', async (req, res) => {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRestaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(updatedRestaurant);
  });

  // DELETE /restaurants/:id - Delete a restaurant by ID (admin only)
  router.delete('/:id', async (req, res) => {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json({ message: 'Restaurant deleted' });
  });

  module.exports = router;