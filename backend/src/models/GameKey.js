import bcrypt from 'bcryptjs';
import { prisma } from '../index.js';

// Функция для добавления нового ключа
export const addGameKey = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  return await prisma.gameKey.create({
    data: {
      ...data,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    include: {
      game: true,
      buyer: true
    }
  });
};

// Функция для подсчета доступных ключей
export const countAvailableKeys = async (gameId) => {
  return await prisma.gameKey.count({
    where: {
      gameId: parseInt(gameId),
      status: 'available'
    }
  });
};

// Функция для получения всех ключей
export const getAllGameKeys = async () => {
  return await prisma.gameKey.findMany({
    include: {
      game: true,
      buyer: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
};

// Функция для получения ключей пользователя
export const getGameKeysByUser = async (userId) => {
  return await prisma.gameKey.findMany({
    where: {
      buyerId: parseInt(userId)
    },
    include: {
      game: true
    }
  });
};

// Функция для получения ключа по ID
export const getGameKeyById = async (id) => {
  return await prisma.gameKey.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      game: true,
      buyer: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
};

// Функция для резервирования ключа
export const reserveKey = async (gameId, userId) => {
  const key = await prisma.gameKey.findFirst({
    where: {
      gameId: parseInt(gameId),
      status: 'available'
    }
  });

  if (!key) {
    throw new Error('Нет доступных ключей для этой игры');
  }

  const reservationExpiry = new Date();
  reservationExpiry.setMinutes(reservationExpiry.getMinutes() + 15);

  return await prisma.gameKey.update({
    where: { id: key.id },
    data: {
      status: 'reserved',
      buyerId: parseInt(userId),
      reservationExpiry
    },
    include: {
      game: true,
      buyer: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
};

// Функция для подтверждения покупки ключа
export const confirmPurchase = async (keyId, userId) => {
  const key = await prisma.gameKey.findUnique({
    where: { id: parseInt(keyId) }
  });

  if (!key) {
    throw new Error('Ключ не найден');
  }

  if (key.status !== 'reserved' || key.buyerId !== parseInt(userId)) {
    throw new Error('Ключ не зарезервирован за вами');
  }

  return await prisma.gameKey.update({
    where: { id: parseInt(keyId) },
    data: {
      status: 'sold',
      reservationExpiry: null
    },
    include: {
      game: true,
      buyer: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
};

// Функция для отмены резервации
export const cancelReservation = async (keyId) => {
  return await prisma.gameKey.update({
    where: { id: parseInt(keyId) },
    data: {
      status: 'available',
      buyerId: null,
      reservationExpiry: null
    },
    include: {
      game: true
    }
  });
};

// Функция для очистки просроченных резерваций
export const clearExpiredReservations = async () => {
  const now = new Date();
  
  return await prisma.gameKey.updateMany({
    where: {
      status: 'reserved',
      reservationExpires: {
        lt: now
      }
    },
    data: {
      status: 'available',
      reservedById: null,
      reservedAt: null,
      reservationExpires: null
    }
  });
};

// Функция для удаления ключа
export const deleteGameKey = async (keyId) => {
  return await prisma.gameKey.delete({
    where: { id: parseInt(keyId) }
  });
};
