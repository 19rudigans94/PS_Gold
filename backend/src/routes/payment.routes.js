import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
import { validateId } from '../middleware/validation.middleware.js';
import {
  createPayment,
  getPaymentStatus,
  getAllPayments,
  getPaymentById
} from '../controllers/payment.controller.js';

const router = express.Router();

// Маршруты для пользователей
router.post('/', protect, createPayment);
router.get('/status/:id', protect, validateId, getPaymentStatus);

// Маршруты для администраторов
router.get('/', protect, admin, getAllPayments);
router.get('/:id', protect, admin, validateId, getPaymentById);

export default router;
