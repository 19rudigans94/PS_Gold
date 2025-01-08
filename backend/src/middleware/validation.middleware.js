import { body, param, validationResult } from 'express-validator';

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }
    next();
  };
};

// Валидация для игр
export const gameValidation = [
  body('title').notEmpty().trim().withMessage('Название игры обязательно'),
  body('price').isFloat({ min: 0 }).withMessage('Цена должна быть положительным числом'),
  body('description').optional().trim(),
  body('genre').notEmpty().withMessage('Жанр обязателен'),
  body('platform').notEmpty().withMessage('Платформа обязательна'),
  body('releaseDate').optional().isISO8601().withMessage('Некорректная дата выпуска'),
  body('publisher').notEmpty().withMessage('Издатель обязателен'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Некорректный статус')
];

// Валидация для ключей игр
export const gameKeyValidation = [
  body('gameId').isInt().withMessage('ID игры должно быть числом'),
  body('keys').isArray().withMessage('Ключи должны быть массивом'),
  body('keys.*.password').notEmpty().withMessage('Пароль обязателен для каждого ключа')
];

// Валидация для пользователей
export const userValidation = [
  body('email').isEmail().withMessage('Некорректный email'),
  body('password').isLength({ min: 6 }).withMessage('Пароль должен быть не менее 6 символов'),
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Имя должно быть не менее 2 символов')
];

// Валидация для заказов
export const orderValidation = [
  body('games').isArray().withMessage('Список игр должен быть массивом'),
  body('games.*.gameId').isInt().withMessage('ID игры должно быть числом'),
  body('games.*.quantity').isInt({ min: 1 }).withMessage('Количество должно быть положительным числом')
];

// Валидация ID параметра
export const validateId = [
  param('id').isInt().withMessage('ID должно быть числом')
];
