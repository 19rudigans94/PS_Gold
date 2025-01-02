import { validationResult } from 'express-validator';
import Console from '../models/Console.js';
import fs from 'fs';
import path from 'path';

export const getConsoles = async (req, res) => {
  try {
    const consoles = await Console.find();
    res.json(consoles);
  } catch (error) {
    console.error('Ошибка при получении консолей:', error);
    res.status(500).json({ message: 'Ошибка при получении консолей' });
  }
};

export const getConsole = async (req, res) => {
  try {
    const console = await Console.findById(req.params.id);
    if (!console) {
      return res.status(404).json({ message: 'Консоль не найдена' });
    }
    res.json(console);
  } catch (error) {
    console.error('Ошибка при получении консоли:', error);
    res.status(500).json({ message: 'Ошибка при получении консоли' });
  }
};

export const createConsole = async (req, res) => {
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

    const consoleData = {
      title: req.body.title,
      pricePerDay: req.body.pricePerDay,
      description: req.body.description,
      imageUrl: req.file ? req.file.filename : undefined,
      condition: req.body.condition,
      serialNumber: req.body.serialNumber,
      accessories: req.body.accessories ? JSON.parse(req.body.accessories) : [],
      inStock: req.body.inStock === 'true',
      featured: req.body.featured === 'true'
    };

    console.log('Данные для создания консоли:', consoleData);

    const newConsole = new Console(consoleData);
    console.log('Созданный объект консоли:', newConsole);

    const savedConsole = await newConsole.save();
    console.log('Сохраненная консоль:', savedConsole);

    res.status(201).json(savedConsole);
  } catch (error) {
    console.error('Ошибка при создании консоли:', error);
    // Если произошла ошибка, удаляем загруженный файл
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Ошибка при удалении файла:', err);
      });
    }
    res.status(500).json({ message: 'Ошибка при создании консоли: ' + error.message });
  }
};

export const updateConsole = async (req, res) => {
  try {
    const console = await Console.findById(req.params.id);
    if (!console) {
      // Если файл был загружен, удаляем его
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Ошибка при удалении файла:', err);
        });
      }
      return res.status(404).json({ message: 'Консоль не найдена' });
    }

    // Если загружается новое изображение
    if (req.file) {
      // Удаляем старое изображение
      if (console.imageUrl) {
        const oldImagePath = path.join(process.cwd(), console.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error('Ошибка при удалении старого изображения:', err);
          });
        }
      }
    }

    const consoleData = {
      title: req.body.title,
      pricePerDay: req.body.pricePerDay,
      description: req.body.description,
      imageUrl: req.file ? req.file.filename : console.imageUrl,
      condition: req.body.condition,
      serialNumber: req.body.serialNumber,
      accessories: req.body.accessories ? JSON.parse(req.body.accessories) : console.accessories,
      inStock: req.body.inStock === 'true',
      featured: req.body.featured === 'true'
    };

    const updatedConsole = await Console.findByIdAndUpdate(
      req.params.id,
      { $set: consoleData },
      { new: true }
    );

    res.json(updatedConsole);
  } catch (error) {
    console.error('Ошибка при обновлении консоли:', error);
    // Если произошла ошибка, удаляем загруженный файл
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Ошибка при удалении файла:', err);
      });
    }
    res.status(500).json({ message: 'Ошибка при обновлении консоли: ' + error.message });
  }
};

export const deleteConsole = async (req, res) => {
  try {
    const console = await Console.findById(req.params.id);
    if (!console) {
      return res.status(404).json({ message: 'Консоль не найдена' });
    }

    // Удаляем изображение
    if (console.imageUrl) {
      const imagePath = path.join(process.cwd(), console.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) console.error('Ошибка при удалении изображения:', err);
        });
      }
    }

    await Console.findByIdAndDelete(req.params.id);
    res.json({ message: 'Консоль успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении консоли:', error);
    res.status(500).json({ message: 'Ошибка при удалении консоли: ' + error.message });
  }
};