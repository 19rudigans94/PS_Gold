import { validationResult } from 'express-validator';
import { prisma } from '../index.js';
import { createUser, getAllUsers, updateUser, deleteUser, comparePassword, getUserById } from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    res.status(500).json({ message: 'Ошибка при получении пользователей' });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    // Удаляем пароль из ответа
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error);
    res.status(500).json({ message: 'Ошибка при получении пользователя' });
  }
};

export const createUserController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Проверяем права доступа
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    const { email, name, role, status } = req.body;

    // Проверяем, существует ли пользователь с таким email
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Генерируем временный пароль
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Создаем пользователя
    const newUser = await createUser({
      email,
      name,
      password: hashedPassword,
      role: role || 'user',
      status: status || 'active'
    });

    // Удаляем пароль из ответа
    const { password, ...userWithoutPassword } = newUser;

    // TODO: Отправить email с временным паролем

    res.status(201).json({
      ...userWithoutPassword,
      message: `Пользователь создан. Временный пароль: ${tempPassword}`
    });
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
    res.status(500).json({ message: 'Ошибка при создании пользователя' });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Некорректный ID пользователя' });
    }

    // Проверка прав доступа: пользователь может редактировать только свой профиль, администратор - все
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    // Извлекаем только разрешенные для обновления поля
    const { email, name, role, status } = req.body;
    const updateData = {};
    
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          NOT: {
            id: userId
          }
        }
      });
      
      if (existingUser) {
        return res.status(400).json({ message: 'Email уже используется' });
      }
      updateData.email = email;
    }

    if (name) updateData.name = name;
    if (role && req.user.role === 'admin') updateData.role = role;
    if (status && req.user.role === 'admin') updateData.status = status;

    const updatedUser = await updateUser(userId, updateData);
    const { password, ...userWithoutPassword } = updatedUser;
    
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
    res.status(500).json({ message: 'Ошибка при обновлении пользователя' });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    await deleteUser(req.params.id);
    res.json({ message: 'Пользователь успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    res.status(500).json({ message: 'Ошибка при удалении пользователя' });
  }
};