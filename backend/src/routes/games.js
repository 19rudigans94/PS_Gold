import express from 'express';
import { body } from 'express-validator';
import { getGames, getGame, createGame, updateGame, deleteGame } from '../controllers/games.js';
import { auth, adminAuth } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getGames);
router.get('/:id', getGame);
router.post('/', adminAuth, upload.single('image'), [
  body('title').notEmpty().withMessage('Введите название игры'),
  body('console').notEmpty().withMessage('Выберите консоль'),
  body('price').isNumeric().withMessage('Укажите корректную цену')
], createGame);
router.put('/:id', adminAuth, upload.single('image'), updateGame);
router.delete('/:id', adminAuth, deleteGame);

export default router;