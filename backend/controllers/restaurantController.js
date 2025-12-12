import Restaurant from '../models/Restaurant.js';

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().lean();
    res.json(restaurants);
  } catch (err) {
    console.error('getRestaurants error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).lean();
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    console.error('getRestaurant error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createRestaurant = async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    console.error('createRestaurant error:', err);
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(updated);
  } catch (err) {
    console.error('updateRestaurant error:', err);
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Restaurant not found' });
    res.json({ message: 'Restaurant deleted' });
  } catch (err) {
    console.error('deleteRestaurant error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};