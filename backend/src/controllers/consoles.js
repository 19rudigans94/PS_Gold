import { validationResult } from 'express-validator';
import { createConsole, getAllConsoles, getConsoleById, updateConsole, deleteConsole } from '../models/Console.js';
import fs from 'fs';
import path from 'path';

export const getConsoles = async (req, res) => {
  try {
    const consoles = await getAllConsoles();
    res.json(consoles);
  } catch (error) {
    console.error('Ошибка при получении консолей:', error);
    res.status(500).json({ message: 'Ошибка при получении консолей' });
  }
};

export const getConsole = async (req, res) => {
  try {
    const console = await getConsoleById(req.params.id);
    if (!console) {
      return res.status(404).json({ message: 'Консоль не найдена' });
    }
    res.json(console);
  } catch (error) {
    console.error('Ошибка при получении консоли:', error);
    res.status(500).json({ message: 'Ошибка при получении консоли' });
  }
};

export const createConsoleController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ errors: errors.array() });
    }

    const consoleData = {
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      releaseYear: parseInt(req.body.releaseYear),
      description: req.body.description,
      price: parseFloat(req.body.price || 0),
      imageUrl: req.file ? req.file.path : undefined,
      isAvailable: req.body.isAvailable === 'true'
    };

    const newConsole = await createConsole(consoleData);
    res.status(201).json(newConsole);
  } catch (error) {
    console.error('Ошибка при создании консоли:', error);
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Ошибка при создании консоли' });
  }
};

export const updateConsoleController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ errors: errors.array() });
    }

    const existingConsole = await getConsoleById(req.params.id);
    if (!existingConsole) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ message: 'Консоль не найдена' });
    }

    const consoleData = {
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      releaseYear: parseInt(req.body.releaseYear),
      description: req.body.description,
      price: parseFloat(req.body.price || existingConsole.price),
      isAvailable: req.body.isAvailable === 'true'
    };

    if (req.file) {
      if (existingConsole.imageUrl) {
        fs.unlinkSync(existingConsole.imageUrl);
      }
      consoleData.imageUrl = req.file.path;
    }

    const updatedConsole = await updateConsole(req.params.id, consoleData);
    res.json(updatedConsole);
  } catch (error) {
    console.error('Ошибка при обновлении консоли:', error);
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Ошибка при обновлении консоли' });
  }
};

export const deleteConsoleController = async (req, res) => {
  try {
    const console = await getConsoleById(req.params.id);
    if (!console) {
      return res.status(404).json({ message: 'Консоль не найдена' });
    }

    if (console.imageUrl) {
      fs.unlinkSync(console.imageUrl);
    }

    await deleteConsole(req.params.id);
    res.json({ message: 'Консоль успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении консоли:', error);
    res.status(500).json({ message: 'Ошибка при удалении консоли' });
  }
};