import { validationResult } from 'express-validator';
import { getSettings } from '../models/Settings.js';
import nodemailer from 'nodemailer';

export const submitContactForm = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    // Получаем настройки email из базы данных
    const settings = await getSettings();
    const supportEmail = settings.find(s => s.key === 'contact.supportEmail')?.value;
    
    if (!supportEmail) {
      throw new Error('Email для поддержки не настроен');
    }

    // Создаем транспорт для отправки email
    // Замените на свои настройки SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Отправляем email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: supportEmail,
      subject: 'Новое сообщение с контактной формы',
      html: `
        <h3>Новое сообщение от ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message}</p>
      `
    });

    res.json({ message: 'Сообщение успешно отправлено' });
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    res.status(500).json({ message: 'Ошибка при отправке сообщения' });
  }
};
