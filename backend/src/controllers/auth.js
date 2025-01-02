import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

export const register = async (req, res) => {
  console.log('Регистрация начата', req.body);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Ошибки валидации:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Пользователь с таким email уже существует');
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    const user = new User({ email, password, name });
    await user.save();
    console.log('Пользователь успешно сохранен');

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const { password: _, ...userData } = user._doc;
    res.status(201).json({ token, user: userData });
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    res.status(500).json({ message: 'Ошибка при регистрации' });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    if (user.status === 'blocked') {
      return res.status(403).json({ message: 'Аккаунт заблокирован' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const { password: _, ...userData } = user._doc;
    res.json({ token, user: userData });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при входе' });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const { password: _, ...userData } = req.user._doc;
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при проверке авторизации' });
  }
};