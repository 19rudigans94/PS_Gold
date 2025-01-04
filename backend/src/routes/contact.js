import express from 'express';
import { body } from 'express-validator';
import { submitContactForm } from '../controllers/contact.js';

const router = express.Router();

router.post(
  '/',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Имя обязательно')
      .isLength({ min: 2 })
      .withMessage('Имя должно содержать минимум 2 символа'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email обязателен')
      .isEmail()
      .withMessage('Введите корректный email'),
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Сообщение обязательно')
      .isLength({ min: 10 })
      .withMessage('Сообщение должно содержать минимум 10 символов')
  ],
  submitContactForm
);

export default router;
