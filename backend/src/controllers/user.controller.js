import { BaseController } from './base.controller.js';
import { AppError } from '../middleware/error.middleware.js';
import bcrypt from 'bcryptjs';
import { handleFileUpload, removeFile } from '../utils/crud.utils.js';

class UserController extends BaseController {
  constructor() {
    super('user');
    this.defaultSelect = {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      avatar: true,
      createdAt: true
    };
  }

  async getAll() {
    return await this.prisma.user.findMany({
      select: this.defaultSelect
    });
  }

  async getById(id) {
    const user = await this.prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: this.defaultSelect
    });

    if (!user) {
      throw new AppError('Пользователь не найден', 404);
    }

    return user;
  }

  async update(id, data, file) {
    try {
      const user = await this.getById(id);
      
      const updateData = {
        email: data.email,
        name: data.name,
        role: data.role,
        status: data.status
      };

      if (data.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(data.password, salt);
      }

      if (file) {
        const avatarUrl = await handleFileUpload(file, UPLOAD_DIRS.AVATARS);
        if (avatarUrl && user.avatar) {
          await removeFile(user.avatar);
        }
        updateData.avatar = avatarUrl;
      }

      return await this.prisma.user.update({
        where: { id: parseInt(id) },
        data: updateData,
        select: this.defaultSelect
      });
    } catch (error) {
      if (file) {
        await removeFile(file.path);
      }
      throw error;
    }
  }

  async delete(id) {
    const user = await this.getById(id);

    // Проверяем, нет ли активных заказов
    const activeOrders = await this.prisma.order.count({
      where: {
        userId: parseInt(id),
        status: { in: ['pending', 'processing'] }
      }
    });

    if (activeOrders > 0) {
      throw new AppError('Невозможно удалить пользователя с активными заказами', 400);
    }

    // Удаляем аватар пользователя
    if (user.avatar) {
      await removeFile(user.avatar);
    }

    await this.prisma.user.delete({
      where: { id: parseInt(id) }
    });
  }

  async getProfile(userId) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        ...this.defaultSelect,
        orders: {
          select: {
            id: true,
            status: true,
            totalAmount: true,
            createdAt: true
          }
        }
      }
    });
  }

  // Обработчики HTTP запросов
  handleGetAll = async (req, res, next) => {
    try {
      const users = await this.getAll();
      res.json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  };

  handleGetById = async (req, res, next) => {
    try {
      const user = await this.getById(parseInt(req.params.id));
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };

  handleUpdate = async (req, res, next) => {
    try {
      const user = await this.update(parseInt(req.params.id), req.body, req.file);
      res.json({ 
        success: true, 
        data: user,
        message: 'Пользователь успешно обновлен'
      });
    } catch (error) {
      next(error);
    }
  };

  handleDelete = async (req, res, next) => {
    try {
      await this.delete(parseInt(req.params.id));
      res.json({ 
        success: true, 
        message: 'Пользователь успешно удален'
      });
    } catch (error) {
      next(error);
    }
  };

  handleGetProfile = async (req, res, next) => {
    try {
      const profile = await this.getProfile(req.user.id);
      res.json({ success: true, data: profile });
    } catch (error) {
      next(error);
    }
  };

  handleUpdateProfile = async (req, res, next) => {
    try {
      const user = await this.update(req.user.id, req.body, req.file);
      res.json({ 
        success: true, 
        data: user,
        message: 'Профиль успешно обновлен'
      });
    } catch (error) {
      next(error);
    }
  };
}

const userController = new UserController();

export const {
  handleGetAll: getAllUsers,
  handleGetById: getUserById,
  handleUpdate: updateUser,
  handleDelete: deleteUser,
  handleGetProfile: getProfile,
  handleUpdateProfile: updateProfile
} = userController;
