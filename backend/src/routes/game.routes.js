import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
import { validate, gameValidation, validateId } from '../middleware/validation.middleware.js';
import { uploadGameImage } from '../middleware/upload.middleware.js';
import {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
} from '../controllers/game.controller.js';

const router = express.Router();

// Публичные маршруты
router.get('/games', getAllGames);
router.get('/games/:id', validateId, getGameById);

// Защищенные маршруты (только для админов)
router.use(protect, admin);

router.post('/games', 
  uploadGameImage,
  validate(gameValidation),
  createGame
);

router.put('/games/:id',
  validateId,
  uploadGameImage,
  validate(gameValidation),
  updateGame
);

router.delete('/games/:id',
  validateId,
  deleteGame
);

export default router;
