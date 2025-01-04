import { prisma } from '../index.js';

// Функция для создания новой оплаты
export const createPayment = async (paymentData) => {
  return await prisma.payment.create({
    data: paymentData,
    include: {
      order: {
        include: {
          user: true,
          games: {
            include: {
              game: true
            }
          }
        }
      }
    }
  });
};

// Функция для получения всех оплат
export const getAllPayments = async () => {
  return await prisma.payment.findMany({
    include: {
      order: {
        include: {
          user: true,
          games: {
            include: {
              game: true
            }
          }
        }
      }
    }
  });
};

// Функция для получения оплаты по ID
export const getPaymentById = async (id) => {
  return await prisma.payment.findUnique({
    where: { id: parseInt(id) },
    include: {
      order: {
        include: {
          user: true,
          games: {
            include: {
              game: true
            }
          }
        }
      }
    }
  });
};

// Функция для получения оплат пользователя
export const getUserPayments = async (userId) => {
  return await prisma.payment.findMany({
    where: {
      order: {
        userId: parseInt(userId)
      }
    },
    include: {
      order: {
        include: {
          user: true,
          games: {
            include: {
              game: true
            }
          }
        }
      }
    }
  });
};

// Функция для обновления статуса оплаты
export const updatePaymentStatus = async (paymentId, status) => {
  return await prisma.payment.update({
    where: { id: parseInt(paymentId) },
    data: { status },
    include: {
      order: {
        include: {
          user: true,
          games: {
            include: {
              game: true
            }
          }
        }
      }
    }
  });
};

// Функция для удаления оплаты
export const deletePayment = async (paymentId) => {
  return await prisma.payment.delete({
    where: { id: parseInt(paymentId) }
  });
};
