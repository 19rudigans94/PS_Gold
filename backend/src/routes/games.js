import express from 'express';
import { body } from 'express-validator';
import { getGames, getGame, createGameController, updateGameController, deleteGameController } from '../controllers/games.js';
import { auth, adminAuth } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getGames);
router.get('/:id', getGame);
router.post('/', adminAuth, upload.single('image'), [
  body('title').notEmpty().withMessage('Введите название игры'),
  body('price').isNumeric().withMessage('Укажите корректную цену'),
  body('description').notEmpty().withMessage('Введите описание игры'),
  body('genre').notEmpty().withMessage('Выберите жанр'),
  body('publisher').notEmpty().withMessage('Введите издателя'),
  body('ageRating').notEmpty().withMessage('Выберите возрастной рейтинг'),
  body('isDigital').isString().isIn(['true', 'false']).withMessage('Укажите тип игры (цифровая или физическая)'),
  body('totalCopies')
    .if(body('isDigital').equals('true'))
    .notEmpty().isInt({ min: 1 }).withMessage('Укажите количество копий для цифровой игры'),
], createGameController);
router.put('/:id', adminAuth, upload.single('image'), updateGameController);
router.delete('/:id', adminAuth, deleteGameController);

export default router;