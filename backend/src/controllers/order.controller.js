import { PrismaClient } from '@prisma/client';
import { BaseController } from './base.controller.js';
import { AppError } from '../middleware/error.middleware.js';

const prisma = new PrismaClient();

class OrderController extends BaseController {
  constructor() {
    super('order', prisma);
    this.defaultInclude = {
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      },
      games: {
        include: {
          game: true
        }
      },
      payment: true
    };
  }

  async getAll() {
    return await this.prisma.order.findMany({
      include: this.defaultInclude,
      orderBy: { createdAt: 'desc' }
    });
  }

  async getById(id) {
    const order = await this.prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: this.defaultInclude
    });

    if (!order) {
      throw new AppError('Заказ не найден', 404);
    }

    return order;
  }

  async getUserOrders(userId) {
    return await this.prisma.order.findMany({
      where: { userId },
      include: this.defaultInclude,
      orderBy: { createdAt: 'desc' }
    });
  }

  async create(userId, orderData) {
    const { games } = orderData;
    
    // Проверяем наличие игр
    const gameIds = games.map(id => parseInt(id));
    const existingGames = await this.prisma.game.findMany({
      where: { id: { in: gameIds } }
    });

    if (existingGames.length !== gameIds.length) {
      throw new AppError('Некоторые игры не найдены', 400);
    }

    // Проверяем доступность игр и считаем общую сумму
    let totalAmount = 0;
    for (const game of existingGames) {
      const availableKeys = await this.prisma.gameKey.count({
        where: {
          gameId: game.id,
          status: 'available'
        }
      });

      if (availableKeys === 0) {
        throw new AppError(`Игра ${game.title} недоступна для покупки`, 400);
      }

      totalAmount += game.price;
    }

    // Создаем заказ в транзакции
    return await this.prisma.$transaction(async (prisma) => {
      // Создаем заказ
      const order = await prisma.order.create({
        data: {
          userId,
          totalAmount,
          status: 'pending'
        }
      });

      // Добавляем игры к заказу и резервируем ключи
      for (const gameId of gameIds) {
        // Находим доступный ключ
        const key = await prisma.gameKey.findFirst({
          where: {
            gameId,
            status: 'available'
          }
        });

        // Резервируем ключ
        await prisma.gameKey.update({
          where: { id: key.id },
          data: {
            status: 'reserved',
            orderId: order.id
          }
        });
      }

      return await prisma.order.findUnique({
        where: { id: order.id },
        include: this.defaultInclude
      });
    });
  }

  async updateStatus(id, status) {
    const order = await this.getById(id);
    
    if (!['pending', 'processing', 'completed', 'cancelled'].includes(status)) {
      throw new AppError('Неверный статус заказа', 400);
    }

    // Если заказ отменяется, освобождаем ключи
    if (status === 'cancelled' && order.status !== 'cancelled') {
      await this.prisma.gameKey.updateMany({
        where: { orderId: order.id },
        data: {
          status: 'available',
          orderId: null
        }
      });
    }

    // Если заказ завершается, помечаем ключи как использованные
    if (status === 'completed' && order.status !== 'completed') {
      await this.prisma.gameKey.updateMany({
        where: { orderId: order.id },
        data: { status: 'used' }
      });
    }

    return await this.prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
      include: this.defaultInclude
    });
  }

  // Обработчики HTTP запросов
  handleGetAll = async (req, res, next) => {
    try {
      const orders = await this.getAll();
      res.json({ success: true, data: orders });
    } catch (error) {
      next(error);
    }
  };

  handleGetById = async (req, res, next) => {
    try {
      const order = await this.getById(parseInt(req.params.id));
      res.json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  };

  handleGetUserOrders = async (req, res, next) => {
    try {
      const orders = await this.getUserOrders(req.user.id);
      res.json({ success: true, data: orders });
    } catch (error) {
      next(error);
    }
  };

  handleCreate = async (req, res, next) => {
    try {
      const order = await this.create(req.user.id, req.body);
      res.status(201).json({ 
        success: true, 
        data: order,
        message: 'Заказ успешно создан'
      });
    } catch (error) {
      next(error);
    }
  };

  handleUpdateStatus = async (req, res, next) => {
    try {
      const order = await this.updateStatus(parseInt(req.params.id), req.body.status);
      res.json({ 
        success: true, 
        data: order,
        message: 'Статус заказа успешно обновлен'
      });
    } catch (error) {
      next(error);
    }
  };
}

const orderController = new OrderController();

export const {
  handleGetAll: getAllOrders,
  handleGetById: getOrderById,
  handleGetUserOrders: getUserOrders,
  handleCreate: createOrder,
  handleUpdateStatus: updateOrderStatus
} = orderController;
