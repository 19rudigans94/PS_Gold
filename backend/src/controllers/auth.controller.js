import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { createUser, getUserByEmail, comparePassword, getUserById } from '../models/User.js';

export const register = async (req, res) => {
  console.log('Регистрация начата', req.body);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Ошибки валидации:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      console.log('Пользователь с таким email уже существует');
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    const user = await createUser({ email, password, name });
    console.log('Пользователь успешно сохранен');

    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(201).json({ 
      token, 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    res.status(500).json({ message: 'Ошибка при регистрации' });
  }
};

export const login = async (req, res) => {
  try {
    console.log('Попытка входа:', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Ошибки валидации:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      console.log('Пользователь не найден:', email);
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      console.log('Неверный пароль для пользователя:', email);
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    if (user.status === 'blocked') {
      console.log('Аккаунт заблокирован:', email);
      return res.status(403).json({ message: 'Аккаунт заблокирован' });
    }

    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    const { password: _, ...userData } = user;
    console.log('Успешный вход пользователя:', email);
    res.json({ 
      token, 
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        boughtKeys: userData.boughtKeys,
        reservedKeys: userData.reservedKeys
      }
    });
  } catch (error) {
    console.error('Ошибка при входе:', error);
    res.status(500).json({ message: 'Ошибка при входе', error: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await getUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({ 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Ошибка при проверке аутентификации:', error);
    res.status(500).json({ message: 'Ошибка при проверке аутентификации' });
  }
};