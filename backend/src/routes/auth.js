import express from 'express';
import { body } from 'express-validator';
import { register, login, checkAuth } from '../controllers/auth.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', [
  body('email').isEmail().withMessage('Введите корректный email'),
  body('password').isLength({ min: 6 }).withMessage('Пароль должен быть не менее 6 символов'),
  body('name').notEmpty().withMessage('Введите имя')
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Введите корректный email'),
  body('password').notEmpty().withMessage('Введите пароль')
], login);

router.get('/check', auth, checkAuth);

export default router;