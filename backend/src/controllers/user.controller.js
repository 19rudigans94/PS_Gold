import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs-extra';
import path from 'path';

const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true
      }
    });
    res.json({ success: true, data: users });
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении пользователей' 
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении пользователя' 
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, role, status, password } = req.body;

    const updateData = {
      email,
      name,
      role,
      status
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatar: true
      }
    });

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при обновлении пользователя' 
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }

    // Удаляем аватар пользователя
    if (user.avatar) {
      const avatarPath = path.join(process.cwd(), 'uploads', 'avatars', 
        path.basename(user.avatar));
      await fs.unlink(avatarPath).catch(() => {});
    }

    await prisma.user.delete({
      where: { id: parseInt(id) }
    });

    res.json({ 
      success: true, 
      message: 'Пользователь успешно удален' 
    });
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при удалении пользователя' 
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true
      }
    });

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Ошибка при получении профиля:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении профиля' 
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, currentPassword, newPassword } = req.body;
    const updateData = {};

    if (name) {
      updateData.name = name;
    }

    if (req.file) {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id }
      });

      if (user.avatar) {
        const oldAvatarPath = path.join(process.cwd(), 'uploads', 'avatars', 
          path.basename(user.avatar));
        await fs.unlink(oldAvatarPath).catch(() => {});
      }

      updateData.avatar = `/api/uploads/avatars/${req.file.filename}`;
    }

    if (currentPassword && newPassword) {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id }
      });

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ 
          success: false, 
          message: 'Неверный текущий пароль' 
        });
      }

      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(newPassword, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true
      }
    });

    res.json({ success: true, data: updatedUser });
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path);
    }
    console.error('Ошибка при обновлении профиля:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при обновлении профиля' 
    });
  }
};
