import express from 'express';
import { body } from 'express-validator';
import { auth, adminAuth } from '../middleware/auth.js';
import {
  getAllGameKeys,
  getGameKeysByUser,
  addGameKey,
  reserveKey,
  confirmPurchase,
  cancelReservation,
  deleteGameKey
} from '../models/GameKey.js';
import { validationResult } from 'express-validator';

const router = express.Router();

// Получить все ключи (только для админов)
router.get('/all', adminAuth, async (req, res) => {
  try {
    const keys = await getAllGameKeys();
    res.json(keys);
  } catch (error) {
    console.error('Ошибка при получении ключей:', error);
    res.status(500).json({ message: 'Ошибка при получении ключей' });
  }
});

// Получить ключи пользователя
router.get('/my', auth, async (req, res) => {
  try {
    const keys = await getGameKeysByUser(req.user.id);
    res.json(keys);
  } catch (error) {
    console.error('Ошибка при получении ключей:', error);
    res.status(500).json({ message: 'Ошибка при получении ключей' });
  }
});

// Добавить новые ключи (только для админов)
router.post('/add', adminAuth, [
  body('gameId').isInt().withMessage('Некорректный ID игры'),
  body('keys').isArray().withMessage('Некорректный формат ключей'),
  body('keys.*.login').notEmpty().withMessage('Логин не может быть пустым'),
  body('keys.*.password').notEmpty().withMessage('Пароль не может быть пустым')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { gameId, keys } = req.body;
    const createdKeys = await Promise.all(
      keys.map(key => addGameKey({
        gameId: parseInt(gameId),
        login: key.login,
        password: key.password,
        status: 'available'
      }))
    );

    res.status(201).json(createdKeys);
  } catch (error) {
    console.error('Ошибка при добавлении ключей:', error);
    res.status(500).json({ message: 'Ошибка при добавлении ключей' });
  }
});

// Зарезервировать ключ
router.post('/reserve', auth, [
  body('gameId').isInt().withMessage('Некорректный ID игры')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const key = await reserveKey(req.body.gameId, req.user.id);
    res.json(key);
  } catch (error) {
    console.error('Ошибка при резервации ключа:', error);
    res.status(500).json({ message: 'Ошибка при резервации ключа' });
  }
});

// Подтвердить покупку ключа
router.post('/confirm', auth, [
  body('keyId').isInt().withMessage('Некорректный ID ключа')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const key = await confirmPurchase(req.body.keyId, req.user.id);
    res.json(key);
  } catch (error) {
    console.error('Ошибка при подтверждении покупки:', error);
    res.status(500).json({ message: 'Ошибка при подтверждении покупки' });
  }
});

// Отменить резервацию ключа
router.post('/cancel', auth, [
  body('keyId').isInt().withMessage('Некорректный ID ключа')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const key = await cancelReservation(req.body.keyId);
    res.json(key);
  } catch (error) {
    console.error('Ошибка при отмене резервации:', error);
    res.status(500).json({ message: 'Ошибка при отмене резервации' });
  }
});

// Удалить ключ (только для админов)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await deleteGameKey(parseInt(req.params.id));
    res.json({ message: 'Ключ успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении ключа:', error);
    res.status(500).json({ message: 'Ошибка при удалении ключа' });
  }
});

export default router;
