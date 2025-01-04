import express from 'express';
import { body } from 'express-validator';
import {
  getAllKeys,
  getUserKeys,
  addKeys,
  reserveGameKey,
  confirmKeyPurchase,
  cancelKeyReservation,
  resendKeyData
} from '../controllers/gameKeyController.js';
import { protect, admin, checkKeyOwnership } from '../middleware/authMiddleware.js';

const router = express.Router();

// Валидация для добавления ключей
const validateKeys = [
  body('gameId').notEmpty().withMessage('ID игры обязательно'),
  body('keys').isArray().withMessage('Ключи должны быть массивом'),
  body('keys.*.password').notEmpty().withMessage('Пароль обязателен')
];

// Маршруты для администраторов
router.get('/all', protect, admin, getAllKeys);
router.post('/add', protect, admin, validateKeys, addKeys);

// Маршруты для пользователей
router.get('/my', protect, getUserKeys);
router.post('/reserve', protect, reserveGameKey);
router.post('/:keyId/confirm', protect, confirmKeyPurchase);
router.post('/:keyId/cancel', protect, cancelKeyReservation);
router.post('/:keyId/resend', protect, checkKeyOwnership, resendKeyData);

export default router;
