import { BaseController } from './base.controller.js';
import { AppError } from '../middleware/error.middleware.js';
import { handleFileUpload, removeFile } from '../utils/crud.utils.js';
import { UPLOAD_DIRS } from '../config/constants.js';
import prisma from '../lib/prisma.js';

class GameController extends BaseController {
  constructor() {
    super('game');
    this.defaultInclude = {
      _count: {
        select: { gameKeys: true }
      }
    };
  }

  async getAll() {
    return await super.getAll(this.defaultInclude);
  }

  async getById(id) {
    return await super.getById(id, this.defaultInclude);
  }

  async create(data, file) {
    try {
      const imageUrl = await handleFileUpload(file, UPLOAD_DIRS.GAMES);
      
      return await super.create({
        ...data,
        price: parseFloat(data.price),
        imageUrl,
        status: data.status || 'active'
      });
    } catch (error) {
      if (file) {
        await removeFile(file.path);
      }
      throw error;
    }
  }

  async update(id, data, file) {
    try {
      const game = await this.getById(id);
      
      let imageUrl = undefined;
      if (file) {
        imageUrl = await handleFileUpload(file, UPLOAD_DIRS.GAMES);
        if (game.imageUrl) {
          await removeFile(game.imageUrl);
        }
      }

      return await super.update(id, {
        ...data,
        price: data.price ? parseFloat(data.price) : undefined,
        imageUrl: imageUrl || undefined
      });
    } catch (error) {
      if (file && imageUrl) {
        await removeFile(imageUrl);
      }
      throw error;
    }
  }
  async delete(id) {
    const parsedId = parseInt(id);
    const game = await this.getById(parsedId);
  
    // Удаляем связанные ключи
    await prisma.gameKey.deleteMany({
      where: { gameId: parsedId }
    });
  
    // Удаляем игру
    await super.delete(parsedId);
  
    // Удаляем изображение, если оно есть
    if (game.imageUrl) {
      await removeFile(game.imageUrl);
    }
  }

  // HTTP handlers
  handleGetAll = async (req, res, next) => {
    try {
      const games = await this.getAll();
      res.json({ 
        success: true, 
        data: games 
      });
    } catch (error) {
      next(error);
    }
  };

  handleGetById = async (req, res, next) => {
    try {
      const game = await this.getById(req.params.id);
      res.json({ 
        success: true, 
        data: game 
      });
    } catch (error) {
      next(error);
    }
  };

  handleCreate = async (req, res, next) => {
    try {
      const game = await this.create(req.body, req.file);
      res.status(201).json({ 
        success: true, 
        data: game,
        message: 'Игра успешно создана' 
      });
    } catch (error) {
      next(error);
    }
  };

  handleUpdate = async (req, res, next) => {
    try {
      const game = await this.update(req.params.id, req.body, req.file);
      res.json({ 
        success: true, 
        data: game,
        message: 'Игра успешно обновлена' 
      });
    } catch (error) {
      next(error);
    }
  };

  handleDelete = async (req, res, next) => {
    try {
      await this.delete(req.params.id);
      res.json({ 
        success: true, 
        message: 'Игра успешно удалена' 
      });
    } catch (error) {
      next(error);
    }
  };
}

const gameController = new GameController();

export const {
  handleGetAll: getAllGames,
  handleGetById: getGameById,
  handleCreate: createGame,
  handleUpdate: updateGame,
  handleDelete: deleteGame
} = gameController;