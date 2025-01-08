import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export const protect = async (req, res, next) => {
  try {
    console.log('Auth middleware - Cookies:', req.cookies);
    console.log('Auth middleware - Headers:', req.headers.authorization);

    let token;

    // Проверяем токен в куки
    if (req.cookies.token) {
      token = req.cookies.token;
      console.log('Token found in cookies');
    } 
    // Также поддерживаем токен в заголовке для API клиентов
    else if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token found in Authorization header');
    }

    if (!token) {
      console.log('No token found');
      return res.status(401).json({
        success: false,
        message: 'Доступ запрещен. Требуется авторизация'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token verified successfully:', { userId: decoded.id, role: decoded.role });

      // Проверяем существование пользователя
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          role: true
        }
      });

      if (!user) {
        console.log('User not found in database:', decoded.id);
        return res.status(401).json({
          success: false,
          message: 'Пользователь не найден'
        });
      }

      console.log('User authenticated:', { userId: user.id, role: user.role });
      req.user = user;
      next();
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      return res.status(401).json({
        success: false,
        message: 'Недействительный токен'
      });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при аутентификации'
    });
  }
};

export const admin = (req, res, next) => {
  console.log('Admin check for user:', { userId: req.user?.id, role: req.user?.role });
  
  if (req.user?.role !== 'admin') {
    console.log('Access denied: not an admin');
    return res.status(403).json({
      success: false,
      message: 'Доступ запрещен. Требуются права администратора'
    });
  }
  
  console.log('Admin access granted');
  next();
};

export const checkOwnership = (modelName) => async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id);
    console.log('Checking ownership:', { modelName, itemId, userId: req.user.id });

    const item = await prisma[modelName].findUnique({
      where: { id: itemId }
    });

    if (!item) {
      console.log('Resource not found:', { modelName, itemId });
      return res.status(404).json({
        success: false,
        message: 'Ресурс не найден'
      });
    }

    if (item.userId !== req.user.id && req.user.role !== 'admin') {
      console.log('Access denied: not owner or admin', {
        itemUserId: item.userId,
        requestUserId: req.user.id,
        userRole: req.user.role
      });
      return res.status(403).json({
        success: false,
        message: 'Доступ запрещен. Вы не являетесь владельцем ресурса'
      });
    }

    console.log('Ownership verified');
    next();
  } catch (error) {
    console.error('Ownership check error:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при проверке прав доступа'
    });
  }
};
