import express from 'express';
import { body } from 'express-validator';
import { getConsoles, getConsole, createConsoleController, updateConsoleController, deleteConsoleController } from '../controllers/consoles.js';
import { auth, adminAuth } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getConsoles);
router.get('/:id', getConsole);
router.post('/', adminAuth, upload.single('image'), [
  body('name').notEmpty().withMessage('Название консоли обязательно'),
  body('manufacturer').notEmpty().withMessage('Производитель консоли обязателен'),
  body('releaseYear').isNumeric().withMessage('Укажите корректный год выпуска')
], createConsoleController);
router.put('/:id', adminAuth, upload.single('image'), updateConsoleController);
router.delete('/:id', adminAuth, deleteConsoleController);

export default router;