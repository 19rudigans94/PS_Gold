import express from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Получение настроек (публичный доступ)
router.get('/', getSettings);

// Обновление настроек (только для авторизованных пользователей)
router.put('/', protect, updateSettings);

export default router;
