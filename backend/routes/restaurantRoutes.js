import express from 'express';
import { 
  getRestaurants, 
  getRestaurant, 
  createRestaurant, 
  updateRestaurant, 
  deleteRestaurant 
} from '../controllers/restaurantController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

router.get('/', getRestaurants);
router.get('/:id', getRestaurant);

router.post('/', auth, admin, createRestaurant);
router.put('/:id', auth, admin, updateRestaurant);
router.delete('/:id', auth, admin, deleteRestaurant);

export default router;