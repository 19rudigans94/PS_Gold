import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
import prisma from '../lib/prisma.js';

const router = express.Router();

// Защищенные маршруты (только для админов)
router.use(protect, admin);

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
  try {
    // Получаем статистику из базы данных
    const [
      totalUsers,
      totalGames,
      totalOrders,
      activeGames,
      pendingOrders,
      totalRevenue
    ] = await Promise.all([
      prisma.user.count(),
      prisma.game.count(),
      prisma.order.count(),
      prisma.game.count({
        where: { status: 'active' }
      }),
      prisma.order.count({
        where: { status: 'pending' }
      }),
      prisma.order.aggregate({
        _sum: {
          totalAmount: true
        },
        where: { status: 'completed' }
      })
    ]);

    // Формируем объект статистики
    const stats = {
      users: {
        total: totalUsers,
        newToday: 0, // TODO: Реализовать подсчет новых пользователей
        activeNow: 0 // TODO: Реализовать подсчет активных пользователей
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        revenue: totalRevenue?._sum?.totalAmount || 0
      },
      games: {
        total: totalGames,
        active: activeGames,
        outOfStock: totalGames - activeGames
      },
      keys: {
        total: 0, // TODO: Добавить после реализации ключей
        available: 0,
        sold: 0
      }
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении статистики'
    });
  }
});

export default router;
