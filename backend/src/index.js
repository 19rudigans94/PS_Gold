import app from './app.js';
import prisma from './lib/prisma.js';
import { startCleanupTasks } from './utils/cleanupTasks.js';

const PORT = process.env.PORT || 3000;

// Запуск периодической очистки истекших резерваций
startCleanupTasks();

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to database');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
const shutdown = async () => {
  try {
    await prisma.$disconnect();
    console.log('Disconnected from database');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);