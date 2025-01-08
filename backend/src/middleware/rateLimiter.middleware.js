import rateLimit from 'express-rate-limit';

// Базовый лимитер для всех маршрутов
export const basicLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 минута
  max: 100, // Лимит 100 запросов в минуту
  message: {
    success: false,
    message: 'Слишком много запросов, пожалуйста, попробуйте позже'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Лимитер для аутентификации
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Увеличили лимит до 100 запросов за 15 минут
  message: {
    success: false,
    message: 'Слишком много попыток входа, пожалуйста, попробуйте позже'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Пропускаем проверку для маршрута /check если есть токен
    if (req.path === '/check' && req.headers.authorization) {
      return true;
    }
    return false;
  }
});

// Лимитер для API
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 минута
  max: 300, // Увеличили лимит до 300 запросов в минуту
  message: {
    success: false,
    message: 'Превышен лимит запросов к API, пожалуйста, попробуйте позже'
  },
  standardHeaders: true,
  legacyHeaders: false
});
