import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import gameRoutes from './routes/games.js';
import orderRoutes from './routes/orders.js';
import paymentRoutes from './routes/payments.js';
import settingsRoutes from './routes/settings.js';
import gameKeyRoutes from './routes/gameKeys.js';
import contactRoutes from './routes/contact.js';
import { startCleanupTasks } from './utils/cleanupTasks.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(compression());

// Настройка лимита запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100 // лимит 100 запросов на IP
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Настройка статических файлов
const uploadsPath = path.join(process.cwd(), 'uploads');
const avatarsPath = path.join(uploadsPath, 'avatars');
const gamesPath = path.join(uploadsPath, 'games');

// Создаем директории, если они не существуют
[uploadsPath, avatarsPath, gamesPath].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Создана директория: ${dir}`);
  }
});

console.log('Настройка статических файлов:');
console.log('- Путь к uploads:', uploadsPath);
console.log('- Путь к avatars:', avatarsPath);
console.log('- Существует uploads:', fs.existsSync(uploadsPath));
console.log('- Существует avatars:', fs.existsSync(avatarsPath));
console.log('- Содержимое uploads:', fs.readdirSync(uploadsPath));
console.log('- Содержимое avatars:', fs.existsSync(avatarsPath) ? fs.readdirSync(avatarsPath) : 'директория не существует');

// Настраиваем middleware для статических файлов
app.use('/api/uploads', express.static(uploadsPath, {
  fallthrough: false // Возвращать 404 вместо передачи управления следующему middleware
}));

// Обработка ошибок для статических файлов
app.use((err, req, res, next) => {
  if (err.status === 404) {
    console.error('Файл не найден:', req.url);
    res.status(404).json({
      success: false,
      message: 'Файл не найден',
      error: 'File not found'
    });
  } else {
    console.error('Ошибка при обработке статических файлов:', err);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при обработке файла',
      error: err.message
    });
  }
});

// Initialize Prisma Client
export const prisma = new PrismaClient();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/game-keys', gameKeyRoutes);
app.use('/api/contact', contactRoutes);

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Внутренняя ошибка сервера',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start cleanup tasks
startCleanupTasks();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

// Закрытие базы данных при завершении работы приложения
process.on('exit', () => {
  prisma.$disconnect().catch((err) => {
    console.error('Ошибка при закрытии базы данных:', err);
  });
});