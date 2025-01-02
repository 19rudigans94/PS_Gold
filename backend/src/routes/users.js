import express from 'express';
import { body, validationResult } from 'express-validator';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/users.js';
import { auth, adminAuth } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import User from '../models/User.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/', adminAuth, getUsers);
router.get('/:id', auth, getUser);
router.put('/:id', auth, [
  body('name').optional().notEmpty().withMessage('Имя не может быть пустым'),
  body('email').optional().isEmail().withMessage('Введите корректный email'),
  body('phone').optional(),
  body('address').optional()
], updateUser);
router.delete('/:id', adminAuth, deleteUser);

router.post('/:id/avatar', auth, upload.single('avatar'), async (req, res) => {
  console.log('Маршрут для загрузки аватара вызван');
  console.log('Заголовки запроса:', req.headers);
  console.log('Тело запроса:', req.body);
  console.log('Файл загружен:', req.file);
  
  try {
    // Проверяем авторизацию и соответствие ID
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Нет прав для изменения аватара другого пользователя' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      // Если файл был загружен, удаляем его
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Ошибка при удалении файла:', err);
        });
      }
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Файл не загружен' });
    }

    // Проверяем и создаем директорию uploads, если она не существует
    const uploadsDir = 'uploads';
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Удаляем старый аватар, если он существует
    if (user.avatar) {
      const oldAvatarPath = path.join(process.cwd(), user.avatar);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlink(oldAvatarPath, (err) => {
          if (err) console.error('Ошибка при удалении старого аватара:', err);
        });
      }
    }

    // Сохраняем путь к файлу без префикса 'uploads/'
    const avatarPath = req.file.path;
    user.avatar = avatarPath;
    await user.save();

    // Возвращаем путь к файлу для фронтенда
    res.json({ 
      avatar: avatarPath,
      message: 'Аватар успешно обновлен' 
    });
  } catch (error) {
    console.error('Ошибка при загрузке аватара:', error);
    // Если произошла ошибка, удаляем загруженный файл
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Ошибка при удалении файла:', err);
      });
    }
    res.status(500).json({ message: 'Ошибка при загрузке аватара' });
  }
});

export default router;