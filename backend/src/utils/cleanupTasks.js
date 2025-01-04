import { clearExpiredReservations } from '../models/GameKey.js';

// Очистка просроченных резерваций каждые 5 минут
export const startCleanupTasks = () => {
  const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 минут

  setInterval(async () => {
    try {
      const result = await clearExpiredReservations();
      console.log('Просроченные резервации очищены');
    } catch (error) {
      console.error('Ошибка при очистке просроченных резерваций:', error);
    }
  }, CLEANUP_INTERVAL);
};
