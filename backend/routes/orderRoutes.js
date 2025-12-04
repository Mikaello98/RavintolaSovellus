import express from 'express';
import { getOrders, createOrder } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', auth, admin, getOrders);

export default router;