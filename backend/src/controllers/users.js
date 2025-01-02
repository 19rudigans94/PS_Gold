import { validationResult } from 'express-validator';
import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении пользователей' });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении пользователя' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Проверка прав доступа: пользователь может редактировать только свой профиль, администратор - все
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    const { email, ...updateData } = req.body;
    
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email уже используется' });
      }
      updateData.email = email;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении пользователя' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json({ message: 'Пользователь успешно удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении пользователя' });
  }
};