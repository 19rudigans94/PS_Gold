import { BaseController } from './base.controller.js';
import { AppError } from '../middleware/error.middleware.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PaymentController extends BaseController {
  constructor() {
    super('payment', prisma);
    this.defaultInclude = {
      order: {
        include: {
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
          }
        }
      }
    };
  }

  async getAll() {
    return await this.prisma.payment.findMany({
      include: this.defaultInclude,
      orderBy: { createdAt: 'desc' }
    });
  }

  async getById(id) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: parseInt(id) },
      include: this.defaultInclude
    });

    if (!payment) {
      throw new AppError('Платеж не найден', 404);
    }

    return payment;
  }

  async create(userId, data) {
    const { orderId, paymentMethod } = data;

    // Проверяем существование заказа
    const order = await this.prisma.order.findUnique({
      where: { id: parseInt(orderId) }
    });

    if (!order) {
      throw new AppError('Заказ не найден', 404);
    }

    if (order.userId !== userId) {
      throw new AppError('Нет доступа к этому заказу', 403);
    }

    // Проверяем, нет ли уже платежа для этого заказа
    const existingPayment = await this.prisma.payment.findUnique({
      where: { orderId: parseInt(orderId) }
    });

    if (existingPayment) {
      throw new AppError('Платеж для этого заказа уже существует', 400);
    }

    // Создаем платеж в транзакции
    return await this.prisma.$transaction(async (prisma) => {
      const payment = await prisma.payment.create({
        data: {
          orderId: parseInt(orderId),
          amount: order.totalAmount,
          paymentMethod,
          status: 'pending'
        },
        include: this.defaultInclude
      });

      // Обновляем статус заказа
      await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: { status: 'processing' }
      });

      return payment;
    });
  }

  async updateStatus(id, status) {
    const payment = await this.getById(id);
    
    if (!['pending', 'processing', 'completed', 'failed'].includes(status)) {
      throw new AppError('Неверный статус платежа', 400);
    }

    return await this.prisma.$transaction(async (prisma) => {
      const updatedPayment = await prisma.payment.update({
        where: { id: parseInt(id) },
        data: { status },
        include: this.defaultInclude
      });

      // Обновляем статус заказа в зависимости от статуса платежа
      if (status === 'completed') {
        await prisma.order.update({
          where: { id: payment.orderId },
          data: { status: 'completed' }
        });
      } else if (status === 'failed') {
        await prisma.order.update({
          where: { id: payment.orderId },
          data: { status: 'pending' }
        });
      }

      return updatedPayment;
    });
  }

  // Обработчики HTTP запросов
  handleGetAll = async (req, res, next) => {
    try {
      const payments = await this.getAll();
      res.json({ success: true, data: payments });
    } catch (error) {
      next(error);
    }
  };

  handleGetById = async (req, res, next) => {
    try {
      const payment = await this.getById(parseInt(req.params.id));
      res.json({ success: true, data: payment });
    } catch (error) {
      next(error);
    }
  };

  handleCreate = async (req, res, next) => {
    try {
      const payment = await this.create(req.user.id, req.body);
      res.status(201).json({ 
        success: true, 
        data: payment,
        message: 'Платеж успешно создан'
      });
    } catch (error) {
      next(error);
    }
  };

  handleUpdateStatus = async (req, res, next) => {
    try {
      const payment = await this.updateStatus(parseInt(req.params.id), req.body.status);
      res.json({ 
        success: true, 
        data: payment,
        message: 'Статус платежа успешно обновлен'
      });
    } catch (error) {
      next(error);
    }
  };
}

const paymentController = new PaymentController();

export const {
  handleGetAll: getAllPayments,
  handleGetById: getPaymentById,
  handleCreate: createPayment,
  handleUpdateStatus: getPaymentStatus
} = paymentController;
