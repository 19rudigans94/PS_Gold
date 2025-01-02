import { validationResult } from 'express-validator';
import Game from '../models/Game.js';
import fs from 'fs';
import path from 'path';

export const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    console.error('Ошибка при получении игр:', error);
    res.status(500).json({ message: 'Ошибка при получении игр' });
  }
};

export const getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Игра не найдена' });
    }
    res.json(game);
  } catch (error) {
    console.error('Ошибка при получении игры:', error);
    res.status(500).json({ message: 'Ошибка при получении игры' });
  }
};

export const createGame = async (req, res) => {
  try {
    console.log('Получены данные:', {
      body: req.body,
      file: req.file,
      headers: req.headers
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Ошибки валидации:', errors.array());
      // Если файл был загружен, удаляем его
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Ошибка при удалении файла:', err);
        });
      }
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    // Проверяем и создаем директорию uploads, если она не существует
    const uploadsDir = 'uploads';
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const gameData = {
      title: req.body.title,
      description: req.body.description,
      console: req.body.console,
      price: req.body.price,
      genre: req.body.genre,
      releaseYear: req.body.releaseYear,
      ageRating: req.body.ageRating,
      publisher: req.body.publisher,
      inStock: req.body.inStock === 'true',
      featured: req.body.featured === 'true',
      imageUrl: req.file ? req.file.path : undefined
    };

    console.log('Данные для создания игры:', gameData);

    const game = new Game(gameData);
    console.log('Созданный объект игры:', game);

    const savedGame = await game.save();
    console.log('Сохраненная игра:', savedGame);

    res.status(201).json(savedGame);
  } catch (error) {
    console.error('Ошибка при создании игры:', error);
    // Если произошла ошибка, удаляем загруженный файл
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Ошибка при удалении файла:', err);
      });
    }
    res.status(500).json({ message: 'Ошибка при создании игры: ' + error.message });
  }
};

export const updateGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      // Если файл был загружен, удаляем его
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Ошибка при удалении файла:', err);
        });
      }
      return res.status(404).json({ message: 'Игра не найдена' });
    }

    // Если загружается новое изображение
    if (req.file) {
      // Удаляем старое изображение
      if (game.imageUrl) {
        const oldImagePath = path.join(process.cwd(), game.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error('Ошибка при удалении старого изображения:', err);
          });
        }
      }
    }

    const gameData = {
      title: req.body.title,
      description: req.body.description,
      console: req.body.console,
      price: req.body.price,
      genre: req.body.genre,
      releaseYear: req.body.releaseYear,
      ageRating: req.body.ageRating,
      publisher: req.body.publisher,
      inStock: req.body.inStock === 'true',
      featured: req.body.featured === 'true',
      imageUrl: req.file ? req.file.path : game.imageUrl
    };

    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      { $set: gameData },
      { new: true }
    );

    res.json(updatedGame);
  } catch (error) {
    console.error('Ошибка при обновлении игры:', error);
    // Если произошла ошибка, удаляем загруженный файл
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Ошибка при удалении файла:', err);
      });
    }
    res.status(500).json({ message: 'Ошибка при обновлении игры: ' + error.message });
  }
};

export const deleteGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Игра не найдена' });
    }

    // Удаляем изображение
    if (game.imageUrl) {
      const imagePath = path.join(process.cwd(), game.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) console.error('Ошибка при удалении изображения:', err);
        });
      }
    }

    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: 'Игра успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении игры:', error);
    res.status(500).json({ message: 'Ошибка при удалении игры: ' + error.message });
  }
};