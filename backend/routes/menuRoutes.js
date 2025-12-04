import express from 'express';
import { 
  getMenuItems, 
  getMenuItem, 
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem 
} from '../controllers/menuController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

router.get('/', getMenuItems);
router.get('/:id', getMenuItem);

router.post('/', auth, admin, createMenuItem);
router.put('/:id', auth, admin, updateMenuItem);
router.delete('/:id', auth, admin, deleteMenuItem);

export default router;