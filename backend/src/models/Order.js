import { prisma } from '../index.js';

// Функция для создания нового заказа
export const createOrder = async (orderData) => {
  return await prisma.order.create({
    data: orderData,
    include: {
      user: true,
      games: {
        include: {
          game: true
        }
      },
      payment: true
    }
  });
};

// Функция для получения всех заказов
export const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      user: true,
      games: {
        include: {
          game: true
        }
      },
      payment: true
    }
  });
};

// Функция для получения заказа по ID
export const getOrderById = async (id) => {
  return await prisma.order.findUnique({
    where: { id: parseInt(id) },
    include: {
      user: true,
      games: {
        include: {
          game: true
        }
      },
      payment: true
    }
  });
};

// Функция для получения заказов пользователя
export const getUserOrders = async (userId) => {
  return await prisma.order.findMany({
    where: { userId: parseInt(userId) },
    include: {
      user: true,
      games: {
        include: {
          game: true
        }
      },
      payment: true
    }
  });
};

// Функция для обновления статуса заказа
export const updateOrderStatus = async (orderId, status) => {
  return await prisma.order.update({
    where: { id: parseInt(orderId) },
    data: { status },
    include: {
      user: true,
      games: {
        include: {
          game: true
        }
      },
      payment: true
    }
  });
};

// Функция для удаления заказа
export const deleteOrder = async (orderId) => {
  return await prisma.order.delete({
    where: { id: parseInt(orderId) }
  });
};