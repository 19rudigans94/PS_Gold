import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
import { validate, orderValidation, validateId } from '../middleware/validation.middleware.js';
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  getUserOrders
} from '../controllers/order.controller.js';

const router = express.Router();

// Маршруты для пользователей
router.get('/my', protect, getUserOrders);
router.post('/', protect, validate(orderValidation), createOrder);

// Маршруты для администраторов
router.get('/', protect, admin, getAllOrders);
router.get('/:id', protect, admin, validateId, getOrderById);
router.put('/:id/status', protect, admin, validateId, updateOrderStatus);

export default router;
