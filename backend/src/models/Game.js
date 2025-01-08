import prisma from '../lib/prisma.js';

// Функция для получения всех игр
export const getAllGames = async () => {
  return await prisma.game.findMany({
    include: {
      _count: {
        select: {
          gameKeys: true
        }
      }
    }
  });
};

// Функция для получения игры по ID
export const getGameById = async (id) => {
  return await prisma.game.findUnique({
    where: { id: parseInt(id) },
    include: {
      _count: {
        select: {
          gameKeys: true
        }
      }
    }
  });
};

// Функция для создания новой игры
export const createGame = async (data) => {
  const { title, description, price, image } = data;

  return await prisma.game.create({
    data: {
      title,
      description,
      price: parseFloat(price),
      image,
      totalCopies: 0,
      availableCopies: 0
    }
  });
};

// Функция для обновления игры
export const updateGame = async (id, data) => {
  const { title, description, price, image } = data;

  return await prisma.game.update({
    where: { id: parseInt(id) },
    data: {
      title,
      description,
      price: price ? parseFloat(price) : undefined,
      image
    }
  });
};

// Функция для удаления игры
export const deleteGame = async (id) => {
  // Проверяем, есть ли проданные ключи
  const soldKeys = await prisma.gameKey.count({
    where: {
      gameId: parseInt(id),
      status: 'sold'
    }
  });

  if (soldKeys > 0) {
    throw new Error('Нельзя удалить игру с проданными ключами');
  }

  // Удаляем все ключи игры и саму игру в транзакции
  return await prisma.$transaction([
    prisma.gameKey.deleteMany({
      where: { gameId: parseInt(id) }
    }),
    prisma.game.delete({
      where: { id: parseInt(id) }
    })
  ]);
};