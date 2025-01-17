import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
import { validate, gameKeyValidation, validateId } from '../middleware/validation.middleware.js';
import {
  getAllGameKeys,
  getGameKeysByUser,
  addGameKeys,
  reserveGameKey,
  confirmPurchase,
  cancelReservation
} from '../controllers/gameKey.controller.js';

const router = express.Router();

// Маршруты для админов
router.get('/all', protect, admin, getAllGameKeys);
router.post('/add', 
  protect, 
  admin,
  validate(gameKeyValidation),
  addGameKeys
);

// Маршруты для авторизованных пользователей
router.get('/my', protect, getGameKeysByUser);
router.post('/reserve', protect, reserveGameKey);
router.post('/confirm', protect, confirmPurchase);
router.post('/cancel', protect, cancelReservation);

export default router;
