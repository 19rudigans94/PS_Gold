import express from 'express';
import { body } from 'express-validator';
import {
  getAllKeys,
  getUserKeys,
  addKeys,
  reserveKey,
  confirmKeyPurchase,
  cancelKeyReservation,
  resendKeyData,
  deleteKey
} from '../controllers/gameKeyController.js';
import { protect, admin, checkKeyOwnership } from '../middleware/authMiddleware.js';

const router = express.Router();

// Валидация для добавления ключей
const validateKeys = [
  body('gameId').notEmpty().withMessage('ID игры обязательно'),
  body('keys').isArray().withMessage('Ключи должны быть массивом'),
  body('keys.*.login').notEmpty().withMessage('Логин обязателен'),
  body('keys.*.password').notEmpty().withMessage('Пароль обязателен')
];

// Маршруты для админов
router.get('/all', protect, admin, getAllKeys);
router.post('/add', protect, admin, validateKeys, addKeys);
router.delete('/:keyId', protect, admin, deleteKey);

// Маршруты для пользователей
router.get('/my', protect, getUserKeys);
router.post('/reserve', protect, reserveKey);
router.post('/confirm', protect, checkKeyOwnership, confirmKeyPurchase);
router.post('/cancel', protect, checkKeyOwnership, cancelKeyReservation);
router.get('/resend/:keyId', protect, checkKeyOwnership, resendKeyData);

export default router;
