import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware для проверки аутентификации
export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'Пользователь не найден' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Не авторизован' });
  }
};

// Middleware для проверки роли админа
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Нет прав доступа' });
  }
};

// Middleware для проверки владельца ключа
export const checkKeyOwnership = async (req, res, next) => {
  try {
    const keyId = req.params.keyId || req.body.keyId;
    const key = await GameKey.findById(keyId);

    if (!key) {
      return res.status(404).json({ message: 'Ключ не найден' });
    }

    if (key.buyer?.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Нет прав доступа к этому ключу' });
    }

    req.gameKey = key;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при проверке прав доступа' });
  }
};
