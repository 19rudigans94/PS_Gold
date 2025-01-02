import express from 'express';
import { body } from 'express-validator';
import { getConsoles, getConsole, createConsole, updateConsole, deleteConsole } from '../controllers/consoles.js';
import { auth, adminAuth } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getConsoles);
router.get('/:id', getConsole);
router.post('/', adminAuth, upload.single('image'), [
  body('title').notEmpty().withMessage('Название консоли обязательно'),
  body('pricePerDay').isNumeric().withMessage('Укажите корректную цену за день')
], createConsole);
router.put('/:id', adminAuth, upload.single('image'), updateConsole);
router.delete('/:id', adminAuth, deleteConsole);

export default router;