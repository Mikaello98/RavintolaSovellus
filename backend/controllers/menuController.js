import MenuItem from '../models/MenuItem.js';

export const getMenuItems = async (req, res) => {
  const { restaurantId } = req.query;
  const filter = restaurantId ? { restaurant: restaurantId } : {};
  const menuItems = await MenuItem.find(filter);
  res.json(menuItems);
};

export const getMenuItem = async (req, res) => {
  const menuItem = await MenuItem.findById(req.params.id);
  if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
  res.json(menuItem);
};

export const createMenuItem = async (req, res) => {
  const newItem = new MenuItem(req.body);
  await newItem.save();
  res.status(201).json(newItem);
};

export const updateMenuItem = async (req, res) => {
  const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Menu item not found' });
  res.json(updated);
};

export const deleteMenuItem = async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.status(204).end();
};