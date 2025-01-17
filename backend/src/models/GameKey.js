import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';
import { subMinutes, addMinutes } from 'date-fns';

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
          email: true,
          name: true
        }
      }
    }
  });
};

// Функция для получения ключей пользователя
export const getGameKeysByUser = async (userId) => {
  return await prisma.gameKey.findMany({
    where: {
      OR: [
        { buyerId: userId },
        { reservedById: userId }
      ]
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
          email: true,
          name: true
        }
      }
    }
  });
};

// Функция для добавления ключей
export const addGameKeys = async (gameId, keys) => {
  const game = await prisma.game.findUnique({
    where: { id: parseInt(gameId) }
  });

  if (!game) {
    throw new Error('Игра не найдена');
  }

  const createdKeys = await prisma.$transaction(
    keys.map(key => prisma.gameKey.create({
      data: {
        gameId: parseInt(gameId),
        password: key.password,
        status: 'available'
      }
    }))
  );

  await prisma.game.update({
    where: { id: parseInt(gameId) },
    data: {
      totalCopies: { increment: keys.length },
      availableCopies: { increment: keys.length }
    }
  });

  return createdKeys;
};

// Функция для резервирования ключа
export const reserveKey = async (gameId, userId) => {
  const existingReservation = await prisma.gameKey.findFirst({
    where: {
      gameId: parseInt(gameId),
      reservedById: userId,
      status: 'reserved'
    }
  });

  if (existingReservation) {
    throw new Error('У вас уже есть зарезервированный ключ для этой игры');
  }

  const key = await prisma.gameKey.findFirst({
    where: {
      gameId: parseInt(gameId),
      status: 'available'
    }
  });

  if (!key) {
    throw new Error('Нет доступных ключей');
  }

  const reservedKey = await prisma.gameKey.update({
    where: { id: key.id },
    data: {
      status: 'reserved',
      reservedById: userId,
      reservedAt: new Date(),
      reservationExpires: addMinutes(new Date(), 15)
    },
    include: {
      game: true
    }
  });

  await prisma.game.update({
    where: { id: parseInt(gameId) },
    data: {
      availableCopies: { decrement: 1 }
    }
  });

  return reservedKey;
};

// Функция для подтверждения покупки ключа
export const confirmPurchase = async (keyId, userId) => {
  const key = await prisma.gameKey.findFirst({
    where: {
      id: parseInt(keyId),
      reservedById: userId,
      status: 'reserved'
    }
  });

  if (!key) {
    throw new Error('Ключ не найден или не зарезервирован вами');
  }

  return await prisma.gameKey.update({
    where: { id: key.id },
    data: {
      status: 'sold',
      buyerId: userId,
      reservedById: null,
      reservedAt: null,
      reservationExpires: null
    }
  });
};

// Функция для отмены резервации
export const cancelReservation = async (keyId, userId) => {
  const key = await prisma.gameKey.findFirst({
    where: {
      id: parseInt(keyId),
      reservedById: userId,
      status: 'reserved'
    }
  });

  if (!key) {
    throw new Error('Ключ не найден или не зарезервирован вами');
  }

  await prisma.gameKey.update({
    where: { id: key.id },
    data: {
      status: 'available',
      reservedById: null,
      reservedAt: null,
      reservationExpires: null
    }
  });

  await prisma.game.update({
    where: { id: key.gameId },
    data: {
      availableCopies: { increment: 1 }
    }
  });
};

// Функция для очистки просроченных резерваций
export const cleanupExpiredReservations = async () => {
  const expiredReservations = await prisma.gameKey.findMany({
    where: {
      status: 'reserved',
      reservationExpires: {
        lt: new Date()
      }
    },
    include: {
      game: true
    }
  });

  for (const key of expiredReservations) {
    await prisma.$transaction([
      prisma.gameKey.update({
        where: { id: key.id },
        data: {
          status: 'available',
          reservedById: null,
          reservedAt: null,
          reservationExpires: null
        }
      }),
      prisma.game.update({
        where: { id: key.gameId },
        data: {
          availableCopies: { increment: 1 }
        }
      })
    ]);
  }

  return expiredReservations.length;
};

// Функция для удаления ключа
export const deleteGameKey = async (keyId) => {
  return await prisma.gameKey.delete({
    where: { id: parseInt(keyId) }
  });
};
