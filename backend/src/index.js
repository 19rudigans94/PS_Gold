import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import gameRoutes from './routes/games.js';
import consoleRoutes from './routes/consoles.js';
import orderRoutes from './routes/orders.js';
import paymentRoutes from './routes/payments.js';
import settingsRoutes from './routes/settings.js';
import gameKeyRoutes from './routes/gameKeyRoutes.js';
import { startCleanupTasks } from './utils/cleanupTasks.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Настройка статических файлов
const uploadsDir = path.join(process.cwd(), 'uploads');
app.use('/api/uploads', express.static(uploadsDir));
console.log('Директория для загрузок:', uploadsDir);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/consoles', consoleRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/game-keys', gameKeyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Что-то пошло не так!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    startCleanupTasks();
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });