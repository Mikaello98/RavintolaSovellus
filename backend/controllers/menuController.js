import MenuItem from '../models/MenuItem.js';

export const getMenuItems = async (req, res) => {
  try {
    const { restaurantId } = req.query;
    const filter = restaurantId ? { restaurant: restaurantId } : {};
    const menuItems = await MenuItem.find(filter).lean();
    res.json(menuItems);
  } catch (err) {
    console.error('getMenuItems error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).lean();
    if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json(menuItem);
  } catch (err) {
    console.error('getMenuItem error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createMenuItem = async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error('createMenuItem error:', err);
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Menu item not found' });
    res.json(updated);
  } catch (err) {
    console.error('updateMenuItem error:', err);
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error('deleteMenuItem error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};