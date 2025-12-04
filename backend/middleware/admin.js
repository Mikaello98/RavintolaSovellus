import User from '../models/User.js';

export default async function admin(req, res, next) {
  try {
    const user = await User.findById(req.userId).select('role');
    if (!user) return res.status(401).json({ message: 'User not found' });
    if (user.role !== 'admin') return res.status(403).json({ message: 'Requires admin role' });
    next();
  } catch (err) {
    console.error('admin middleware error', err);
    res.status(500).json({ message: 'Server error' });
  }
}