import jwt from 'jsonwebtoken';
import { getUserById } from '../models/User.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      console.log('Токен отсутствует');
      return res.status(401).json({ message: 'Пожалуйста, авторизуйтесь' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Токен декодирован:', decoded);

    if (!decoded.userId) {
      console.log('ID пользователя отсутствует в токене');
      return res.status(401).json({ message: 'Некорректный токен' });
    }

    const user = await getUserById(decoded.userId);
    
    if (!user) {
      console.log('Пользователь не найден:', decoded.userId);
      return res.status(401).json({ message: 'Пользователь не найден' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Ошибка аутентификации:', error);
    res.status(401).json({ message: 'Пожалуйста, авторизуйтесь' });
  }
};

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Пожалуйста, авторизуйтесь' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Пользователь не найден' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Ошибка проверки прав администратора:', error);
    res.status(401).json({ message: 'Пожалуйста, авторизуйтесь' });
  }
};