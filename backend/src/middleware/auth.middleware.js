import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import { AuthenticationError, AuthorizationError } from '../utils/errors.js';
import { verifyToken } from '../utils/token.utils.js';
import { jwtConfig } from '../config/jwt.config.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new AuthenticationError('Доступ запрещен. Требуется авторизация');
    }

    try {
      const decoded = await verifyToken(token);
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          role: true
        }
      });

      if (!user) {
        throw new AuthenticationError('Пользователь не найден');
      }

      req.user = user;
      next();
    } catch (jwtError) {
      throw new AuthenticationError('Недействительный токен');
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при аутентификации'
    });
  }
};

export const admin = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'ADMIN') {
      throw new AuthorizationError('Доступ запрещен. Требуются права администратора');
    }
    next();
  } catch (error) {
    return res.status(error.statusCode || 403).json({
      success: false,
      message: error.message
    });
  }
};

export const autoRefreshToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.decode(token);
      const expiresIn = decoded.exp - Date.now() / 1000;
      
      // Если токен истекает через менее чем 1 час
      if (expiresIn < 3600) {
        const newToken = generateToken(decoded.id);
        res.cookie('token', newToken, jwtConfig.cookie);
      }
    } catch (error) {
      console.error('Ошибка при обновлении токена:', error);
    }
  }
  next();
};