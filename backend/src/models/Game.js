import { prisma } from '../utils/prisma.js';

// Функция для создания новой игры
export const createGame = async (gameData) => {
  try {
    // Преобразуем строковые значения в нужные типы
    const processedData = {
      ...gameData,
      price: parseFloat(gameData.price),
      releaseYear: parseInt(gameData.releaseYear),
      isDigital: gameData.isDigital === 'true',
      totalCopies: parseInt(gameData.totalCopies) || 0,
      availableCopies: parseInt(gameData.totalCopies) || 0, // Изначально доступно столько же копий, сколько всего
    };

    // Если игра цифровая, создаем цифровые ключи
    if (processedData.isDigital && processedData.totalCopies > 0) {
      const keys = Array(processedData.totalCopies).fill(null).map(() => ({
        password: Math.random().toString(36).substring(2, 15),
        status: 'available'
      }));
      processedData.keys = {
        create: keys
      };
    }

    console.log('Processed game data:', processedData);

    return await prisma.game.create({
      data: processedData,
      include: {
        keys: true
      }
    });
  } catch (error) {
    console.error('Error in createGame:', error);
    throw error;
  }
};

// Функция для получения всех игр
export const getAllGames = async () => {
  return await prisma.game.findMany({
    include: {
      keys: {
        select: {
          id: true,
          status: true
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
      keys: {
        select: {
          id: true,
          status: true
        }
      }
    }
  });
};

// Функция для обновления игры
export const updateGame = async (id, gameData) => {
  try {
    const existingGame = await prisma.game.findUnique({
      where: { id: parseInt(id) },
      include: { keys: true }
    });

    if (!existingGame) {
      throw new Error('Game not found');
    }

    const processedData = {
      ...gameData,
      price: parseFloat(gameData.price),
      releaseYear: parseInt(gameData.releaseYear),
      isDigital: gameData.isDigital === 'true',
      totalCopies: parseInt(gameData.totalCopies) || 0,
    };

    // Если изменилось количество копий для цифровой игры
    if (processedData.isDigital && processedData.totalCopies > existingGame.totalCopies) {
      const currentKeys = existingGame.keys.length;
      const newTotalCopies = processedData.totalCopies;
      
      if (newTotalCopies > currentKeys) {
        const additionalKeys = Array(newTotalCopies - currentKeys).fill(null).map(() => ({
          password: Math.random().toString(36).substring(2, 15),
          status: 'available'
        }));
        
        processedData.keys = {
          create: additionalKeys
        };
      }
    }

    return await prisma.game.update({
      where: { id: parseInt(id) },
      data: processedData,
      include: {
        keys: true
      }
    });
  } catch (error) {
    console.error('Error in updateGame:', error);
    throw error;
  }
};

// Функция для удаления игры
export const deleteGame = async (id) => {
  return await prisma.game.delete({
    where: { id: parseInt(id) }
  });
};