import prisma from '../lib/prisma.js';
import { AppError } from '../middleware/error.middleware.js';

export class BaseController {
  constructor(model) {
    this.model = model;
    this.prisma = prisma;
  }

  // Базовые методы CRUD
  async getAll(include = {}) {
    return await this.prisma[this.model].findMany({ include });
  }

  async getById(id, include = {}) {
    const item = await this.prisma[this.model].findUnique({
      where: { id: parseInt(id) },
      include
    });

    if (!item) {
      throw new AppError(`${this.model} не найден`, 404);
    }

    return item;
  }

  async create(data) {
    return await this.prisma[this.model].create({ data });
  }

  async update(id, data) {
    const item = await this.getById(id);
    return await this.prisma[this.model].update({
      where: { id: parseInt(id) },
      data
    });
  }

  async delete(id) {
    await this.getById(id);
    return await this.prisma[this.model].delete({
      where: { id: parseInt(id) }
    });
  }

  // Вспомогательные методы
  async exists(where) {
    const count = await this.prisma[this.model].count({ where });
    return count > 0;
  }

  async transaction(callback) {
    return await this.prisma.$transaction(callback);
  }

  // Обработчики запросов
  handleGetAll = async (req, res, next) => {
    try {
      const items = await this.getAll();
      res.json({ success: true, data: items });
    } catch (error) {
      next(error);
    }
  };

  handleGetById = async (req, res, next) => {
    try {
      const item = await this.getById(req.params.id);
      res.json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };

  handleCreate = async (req, res, next) => {
    try {
      const item = await this.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };

  handleUpdate = async (req, res, next) => {
    try {
      const item = await this.update(req.params.id, req.body);
      res.json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };

  handleDelete = async (req, res, next) => {
    try {
      await this.delete(req.params.id);
      res.json({ success: true, message: 'Успешно удалено' });
    } catch (error) {
      next(error);
    }
  };
}
