import { validationResult } from 'express-validator';
import { createGame, getAllGames, getGameById, updateGame, deleteGame } from '../models/Game.js';
import fs from 'fs';
import path from 'path';

// Создаем константу для директории загрузок
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
const GAMES_IMAGES_DIR = path.join(UPLOADS_DIR, 'games');

// Убедимся, что директории существуют
[UPLOADS_DIR, GAMES_IMAGES_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

export const getGames = async (req, res) => {
  try {
    const games = await getAllGames();
    res.json(games);
  } catch (error) {
    console.error('Ошибка при получении игр:', error);
    res.status(500).json({ message: 'Ошибка при получении игр' });
  }
};

export const getGame = async (req, res) => {
  try {
    const game = await getGameById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Игра не найдена' });
    }
    res.json(game);
  } catch (error) {
    console.error('Ошибка при получении игры:', error);
    res.status(500).json({ message: 'Ошибка при получении игры' });
  }
};

export const createGameController = async (req, res) => {
  let imagePath = null;
  
  try {
    console.log('Получены данные:', {
      body: req.body,
      file: req.file,
      headers: req.headers
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ errors: errors.array() });
    }

    // Преобразуем строковые значения в соответствующие типы
    const gameData = {
      title: req.body.title,
      description: req.body.description,
      price: parseFloat(req.body.price),
      genre: req.body.genre,
      releaseYear: parseInt(req.body.releaseYear),
      ageRating: req.body.ageRating,
      publisher: req.body.publisher,
      isDigital: req.body.isDigital === 'true',
      totalCopies: req.body.isDigital === 'true' ? parseInt(req.body.totalCopies) : 0,
      availableCopies: req.body.isDigital === 'true' ? parseInt(req.body.totalCopies) : 0,
      inStock: req.body.inStock === 'true',
      featured: req.body.featured === 'true'
    };

    // Если есть файл изображения, перемещаем его в правильную директорию
    if (req.file) {
      const oldPath = path.resolve(req.file.path);
      const newPath = path.join(GAMES_IMAGES_DIR, req.file.filename);
      imagePath = oldPath;
      
      // Перемещаем файл из uploads/avatars в uploads/games
      fs.renameSync(oldPath, newPath);
      
      // Обновляем путь к изображению
      gameData.imageUrl = path.join('games', req.file.filename);
    }

    console.log('Данные для создания игры:', gameData);

    const game = await createGame(gameData);
    console.log('Созданная игра:', game);

    res.status(201).json(game);
  } catch (error) {
    console.error('Ошибка при создании игры:', error);
    // Если произошла ошибка и файл существует, удаляем его
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    res.status(500).json({ message: 'Ошибка при создании игры' });
  }
};

export const updateGameController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ errors: errors.array() });
    }

    // Получаем текущую игру
    const existingGame = await getGameById(req.params.id);
    if (!existingGame) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ message: 'Игра не найдена' });
    }

    const gameData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      genre: req.body.genre,
      releaseYear: req.body.releaseYear,
      ageRating: req.body.ageRating,
      publisher: req.body.publisher,
      isDigital: req.body.isDigital,
      totalCopies: req.body.totalCopies,
      inStock: req.body.inStock === 'true',
      featured: req.body.featured === 'true'
    };

    // Если есть новый файл изображения
    if (req.file) {
      // Удаляем старое изображение, если оно есть
      if (existingGame.imageUrl) {
        const oldImagePath = path.join(UPLOADS_DIR, existingGame.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      const relativePath = path.relative(UPLOADS_DIR, req.file.path);
      gameData.imageUrl = relativePath;
    }

    const updatedGame = await updateGame(req.params.id, gameData);
    res.json(updatedGame);
  } catch (error) {
    console.error('Ошибка при обновлении игры:', error);
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Ошибка при обновлении игры' });
  }
};

export const deleteGameController = async (req, res) => {
  try {
    const game = await getGameById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Игра не найдена' });
    }

    // Удаляем изображение, если оно есть
    if (game.imageUrl) {
      const imagePath = path.join(UPLOADS_DIR, game.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await deleteGame(req.params.id);
    res.json({ message: 'Игра успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении игры:', error);
    res.status(500).json({ message: 'Ошибка при удалении игры' });
  }
};