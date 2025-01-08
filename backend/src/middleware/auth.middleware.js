import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Доступ запрещен. Требуется авторизация'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          role: true
        }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Пользователь не найден'
        });
      }

      req.user = user;
      next();
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: 'Недействительный токен'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при аутентификации'
    });
  }
};

export const admin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Требуется авторизация'
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Доступ запрещен. Требуются права администратора'
      });
    }

    next();
  } catch (error) {
    console.error('Admin check error:', error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при проверке прав'
    });
  }
};