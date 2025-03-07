import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
import { validate, gameValidation, validateId } from '../middleware/validation.middleware.js';
import {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
} from '../controllers/game.controller.js';
import { createRoutes } from '../middleware/route.middleware.js';

export default createRoutes()
  // Публичные маршруты
  .public('get', '/', getAllGames)
  .public('get', '/:id', validateId, getGameById)
  
  // Административные маршруты
  .adminOnly('post', '/', validate(gameValidation), createGame)
  .adminOnly('put', '/:id', validateId, validate(gameValidation), updateGame)
  .adminOnly('delete', '/:id', validateId, deleteGame)
  .build();
