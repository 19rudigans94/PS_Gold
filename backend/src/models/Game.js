import prisma from '../lib/prisma.js';

// Функция для создания новой игры
export const createGame = async (data) => {
  const { title, description, price, image } = data;

  // Проверка обязательных полей
  if (!title || !description || !price || !image) {
    throw new Error('Все обязательные поля должны быть заполнены');
  }

  // Преобразование и проверка `price`
  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice)) {
    throw new Error('Цена должна быть числом');
  }

  try {
    return await prisma.game.create({
      data: {
        title,
        description,
        price: parsedPrice,
        image,
        totalCopies: 0,
        availableCopies: 0
      }
    });
  } catch (error) {
    console.error('Ошибка при создании игры:', error);
    throw new Error('Не удалось создать игру');
  }
};

// Функция для обновления игры
export const updateGame = async (id, data) => {
  const { title, description, price, image } = data;

  // Проверка ID
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    throw new Error('Некорректный ID игры');
  }

  // Преобразование и проверка `price`
  const parsedPrice = price ? parseFloat(price) : undefined;
  if (price && isNaN(parsedPrice)) {
    throw new Error('Цена должна быть числом');
  }

  try {
    const existingGame = await prisma.game.findUnique({
      where: { id: parsedId }
    });

    if (!existingGame) {
      throw new Error('Игра с указанным ID не найдена');
    }

    return await prisma.game.update({
      where: { id: parsedId },
      data: {
        title,
        description,
        price: parsedPrice,
        image
      }
    });
  } catch (error) {
    console.error('Ошибка при обновлении игры:', error);
    throw new Error('Не удалось обновить игру');
  }
};