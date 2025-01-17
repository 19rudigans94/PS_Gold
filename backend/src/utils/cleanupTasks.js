import prisma from '../lib/prisma.js';

// Очистка просроченных резерваций каждые 5 минут
export const startCleanupTasks = () => {
  const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 минут

  setInterval(async () => {
    try {
      const expiredReservations = await prisma.gameKey.findMany({
        where: {
          status: 'reserved',
          reservationExpires: {
            lt: new Date()
          }
        },
        include: {
          game: true
        }
      });

      for (const key of expiredReservations) {
        await prisma.$transaction([
          prisma.gameKey.update({
            where: { id: key.id },
            data: {
              status: 'available',
              reservedById: null,
              reservedAt: null,
              reservationExpires: null
            }
          }),
          prisma.game.update({
            where: { id: key.gameId },
            data: {
              availableCopies: { increment: 1 }
            }
          })
        ]);
      }

      if (expiredReservations.length > 0) {
        console.log(`Очищено ${expiredReservations.length} просроченных резерваций`);
      }
    } catch (error) {
      console.error('Ошибка при очистке просроченных резерваций:', error);
    }
  }, CLEANUP_INTERVAL);
};
