import { PrismaClient } from '@prisma/client';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Вспомогательная функция для обработки ошибок
const handleError = (res, error, message) => {
  console.error(message, error);
  res.status(error.status || 500).json({ 
    success: false, 
    message: error.message || message
  });
};

export const getAllGames = async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: { keys: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json({ success: true, data: games });
  } catch (error) {
    handleError(res, error, 'Ошибка при получении списка игр');
  }
};

export const getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await prisma.game.findUnique({
      where: { id: parseInt(id) },
      include: {
        _count: {
          select: { keys: true }
        }
      }
    });

    if (!game) {
      return res.status(404).json({ 
        success: false, 
        message: 'Игра не найдена' 
      });
    }

    res.json({ success: true, data: game });
  } catch (error) {
    handleError(res, error, 'Ошибка при получении игры');
  }
};

export const createGame = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      genre,
      platform,
      publisher,
      releaseDate,
      status
    } = req.body;

    // Обработка загруженного изображения
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/games/${req.file.filename}`;
    }

    const game = await prisma.game.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        genre,
        platform,
        publisher,
        releaseDate: releaseDate ? new Date(releaseDate) : null,
        imageUrl,
        status: status || 'active'
      }
    });

    res.status(201).json({ 
      success: true, 
      data: game,
      message: 'Игра успешно создана' 
    });
  } catch (error) {
    // Удаляем загруженный файл в случае ошибки
    if (req.file) {
      const filePath = path.join(__dirname, '../../uploads/games', req.file.filename);
      await fs.remove(filePath).catch(console.error);
    }
    handleError(res, error, 'Ошибка при создании игры');
  }
};

export const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      genre,
      platform,
      publisher,
      releaseDate,
      status
    } = req.body;

    // Проверяем существование игры
    const existingGame = await prisma.game.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingGame) {
      return res.status(404).json({ 
        success: false, 
        message: 'Игра не найдена' 
      });
    }

    // Обработка загруженного изображения
    let imageUrl = existingGame.imageUrl;
    if (req.file) {
      // Удаляем старое изображение
      if (existingGame.imageUrl) {
        const oldImagePath = path.join(__dirname, '../..', existingGame.imageUrl);
        await fs.remove(oldImagePath).catch(console.error);
      }
      imageUrl = `/uploads/games/${req.file.filename}`;
    }

    const updatedGame = await prisma.game.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        price: price ? parseFloat(price) : undefined,
        genre,
        platform,
        publisher,
        releaseDate: releaseDate ? new Date(releaseDate) : undefined,
        imageUrl,
        status: status || undefined
      }
    });

    res.json({ 
      success: true, 
      data: updatedGame,
      message: 'Игра успешно обновлена' 
    });
  } catch (error) {
    // Удаляем загруженный файл в случае ошибки
    if (req.file) {
      const filePath = path.join(__dirname, '../../uploads/games', req.file.filename);
      await fs.remove(filePath).catch(console.error);
    }
    handleError(res, error, 'Ошибка при обновлении игры');
  }
};

export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;

    // Проверяем существование игры
    const game = await prisma.game.findUnique({
      where: { id: parseInt(id) },
      include: {
        _count: {
          select: { keys: true }
        }
      }
    });

    if (!game) {
      return res.status(404).json({ 
        success: false, 
        message: 'Игра не найдена' 
      });
    }

    // Проверяем, есть ли связанные ключи
    if (game._count.keys > 0) {
      return res.status(400).json({
        success: false,
        message: 'Невозможно удалить игру, так как с ней связаны ключи'
      });
    }

    // Удаляем изображение
    if (game.imageUrl) {
      const imagePath = path.join(__dirname, '../..', game.imageUrl);
      await fs.remove(imagePath).catch(console.error);
    }

    // Удаляем игру
    await prisma.game.delete({
      where: { id: parseInt(id) }
    });

    res.json({ 
      success: true, 
      message: 'Игра успешно удалена' 
    });
  } catch (error) {
    handleError(res, error, 'Ошибка при удалении игры');
  }
};
