import express from 'express';
import { body, validationResult } from 'express-validator';
import { getUsers, getUser, createUserController, updateUserController, deleteUserController } from '../controllers/users.js';
import { auth, adminAuth } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Основные маршруты для пользователей
router.get('/', adminAuth, getUsers);
router.get('/:id', auth, getUser);
router.post('/', adminAuth, [
  body('email').isEmail().withMessage('Введите корректный email'),
  body('name').notEmpty().withMessage('Имя не может быть пустым'),
  body('role').isIn(['user', 'admin']).withMessage('Недопустимая роль'),
  body('status').isIn(['active', 'inactive']).withMessage('Недопустимый статус')
], createUserController);
router.put('/:id', auth, [
  body('name').optional().notEmpty().withMessage('Имя не может быть пустым'),
  body('email').optional().isEmail().withMessage('Введите корректный email'),
  body('role').optional().isIn(['user', 'admin']).withMessage('Недопустимая роль'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Недопустимый статус')
], updateUserController);
router.delete('/:id', adminAuth, deleteUserController);

// Маршрут для загрузки аватара
router.post('/:id/avatar', auth, upload.single('avatar'), async (req, res) => {
  console.log('Маршрут для загрузки аватара вызван');
  console.log('Заголовки запроса:', req.headers);
  console.log('Тело запроса:', req.body);
  console.log('Файл загружен:', req.file);
  
  try {
    const userId = parseInt(req.params.id);
    
    // Проверяем авторизацию и соответствие ID
    if (req.user.userId !== userId) {
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Ошибка при удалении файла:', err);
        });
      }
      return res.status(403).json({ 
        success: false,
        message: 'Нет прав для изменения аватара другого пользователя'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Ошибка при удалении файла:', err);
        });
      }
      return res.status(404).json({ 
        success: false,
        message: 'Пользователь не найден'
      });
    }

    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'Файл не загружен'
      });
    }

    // Проверяем и создаем директорию для аватаров
    const avatarsDir = path.join(process.cwd(), 'uploads/avatars');
    if (!fs.existsSync(avatarsDir)) {
      fs.mkdirSync(avatarsDir, { recursive: true });
      console.log('Создана директория для аватаров:', avatarsDir);
    }

    // Удаляем старый аватар, если он существует
    if (user.avatar) {
      const oldAvatarPath = path.join(avatarsDir, user.avatar);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlink(oldAvatarPath, (err) => {
          if (err) console.error('Ошибка при удалении старого аватара:', err);
        });
      }
    }

    // Перемещаем загруженный файл в нужную директорию
    const newAvatarPath = path.join(avatarsDir, req.file.filename);
    fs.renameSync(req.file.path, newAvatarPath);
    
    // Сохраняем путь к файлу в БД (только имя файла)
    const avatarPath = req.file.filename;
    
    // Обновляем пользователя в базе данных
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarPath }
    });

    console.log('Аватар успешно обновлен:', {
      userId,
      filename: avatarPath,
      fullPath: newAvatarPath
    });

    res.json({
      success: true,
      message: 'Аватар успешно загружен',
      avatar: avatarPath
    });
  } catch (error) {
    console.error('Ошибка при загрузке аватара:', error);
    
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Ошибка при удалении файла:', err);
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Ошибка при загрузке аватара'
    });
  }
});

// Временный маршрут для проверки данных пользователя
router.get('/:id/debug', auth, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Проверяем существование файла
    const avatarPath = user.avatar ? path.join(process.cwd(), 'uploads/avatars', user.avatar) : null;
    const fileExists = avatarPath ? fs.existsSync(avatarPath) : false;

    res.json({
      user,
      debug: {
        avatarPath: avatarPath,
        fileExists: fileExists,
        fullUrl: user.avatar ? `${process.env.API_URL}/uploads/avatars/${user.avatar}` : null,
        cwd: process.cwd()
      }
    });
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({ message: 'Ошибка при получении данных', error: error.message });
  }
});

export default router;