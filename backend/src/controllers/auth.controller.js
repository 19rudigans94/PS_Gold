import { validationResult } from 'express-validator';
import { createUser, getUserByEmail, comparePassword, getUserById } from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.utils.js';
import { AuthenticationError, ValidationError } from '../utils/errors.js';
import { jwtConfig } from '../config/jwt.config.js';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError('Ошибки валидации');
    }

    const { email, password, name } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new ValidationError('Пользователь с таким email уже существует');
    }

    const user = await createUser({ email, password, name });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user.id);

    // Сохраняем refresh token в базе данных
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 дней
      }
    });

    res.cookie('token', accessToken, jwtConfig.cookie);

    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }
    console.error('Ошибка при регистрации:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при регистрации'
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user || !(await comparePassword(password, user.password))) {
      throw new AuthenticationError('Неверный email или пароль');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user.id);

    // Сохраняем refresh token в базе данных
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 дней
      }
    });

    res.cookie('token', accessToken, jwtConfig.cookie);

    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    res.json({
      success: true,
      user: userData
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }
    console.error('Ошибка при входе:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при входе в систему'
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AuthenticationError('Refresh token не предоставлен');
    }

    // Проверяем refresh token в базе данных
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true }
    });

    if (!tokenRecord || new Date() > tokenRecord.expiresAt) {
      throw new AuthenticationError('Недействительный refresh token');
    }

    // Генерируем новые токены
    const user = tokenRecord.user;
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user.id);

    // Обновляем refresh token в базе данных
    await prisma.refreshToken.update({
      where: { id: tokenRecord.id },
      data: {
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 дней
      }
    });

    res.cookie('token', newAccessToken, jwtConfig.cookie);

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }
    console.error('Ошибка при обновлении токена:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при обновлении токена'
    });
  }
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      // Удаляем refresh token из базы данных
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken }
      });
    }

    // Очищаем cookie с access token
    res.clearCookie('token', jwtConfig.cookie);

    res.json({
      success: true,
      message: 'Успешный выход'
    });
  } catch (error) {
    console.error('Ошибка при выходе:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при выходе из системы'
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await getUserById(userId);

    if (!user) {
      throw new AuthenticationError('Пользователь не найден');
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }
    console.error('Ошибка при проверке аутентификации:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при проверке аутентификации'
    });
  }
};