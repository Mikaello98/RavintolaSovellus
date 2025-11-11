import Restaurant from '../models/Restaurant.js';

export const getRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
};

export const getRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
  res.json(restaurant);
};

export const createRestaurant = async (req, res) => {
  const newRestaurant = new Restaurant(req.body);
  await newRestaurant.save();
  res.status(201).json(newRestaurant);
};

export const updateRestaurant = async (req, res) => {
  const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Restaurant not found' });
  res.json(updated);
};

export const deleteRestaurant = async (req, res) => {
  const deleted = await Restaurant.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Restaurant not found' });
  res.json({ message: 'Restaurant deleted' });
};