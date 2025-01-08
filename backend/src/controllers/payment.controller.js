import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        order: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true
              }
            }
          }
        }
      }
    });
    res.json({ success: true, data: payments });
  } catch (error) {
    console.error('Ошибка при получении платежей:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении платежей' 
    });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(id) },
      include: {
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
      }
    });

    if (!payment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Платеж не найден' 
      });
    }

    res.json({ success: true, data: payment });
  } catch (error) {
    console.error('Ошибка при получении платежа:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении платежа' 
    });
  }
};

export const createPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;

    // Проверяем существование заказа
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) }
    });

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Заказ не найден' 
      });
    }

    if (order.userId !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Нет доступа к этому заказу' 
      });
    }

    // Проверяем, нет ли уже платежа для этого заказа
    const existingPayment = await prisma.payment.findUnique({
      where: { orderId: parseInt(orderId) }
    });

    if (existingPayment) {
      return res.status(400).json({ 
        success: false, 
        message: 'Платеж для этого заказа уже существует' 
      });
    }

    // Создаем платеж
    const payment = await prisma.payment.create({
      data: {
        orderId: parseInt(orderId),
        amount: order.totalAmount,
        status: 'pending',
        paymentMethod
      }
    });

    // Здесь можно добавить интеграцию с платежной системой
    // и обработку реального платежа

    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    console.error('Ошибка при создании платежа:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при создании платежа' 
    });
  }
};

export const getPaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(id) },
      include: {
        order: true
      }
    });

    if (!payment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Платеж не найден' 
      });
    }

    if (payment.order.userId !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Нет доступа к этому платежу' 
      });
    }

    res.json({ success: true, data: payment });
  } catch (error) {
    console.error('Ошибка при получении статуса платежа:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении статуса платежа' 
    });
  }
};
