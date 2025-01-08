import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../../services/api';

export const useDashboard = () => {
  const [stats, setStats] = useState({
    users: {
      total: 0,
      newToday: 0,
      activeNow: 0
    },
    orders: {
      total: 0,
      pending: 0,
      revenue: 0
    },
    games: {
      total: 0,
      active: 0,
      outOfStock: 0
    },
    keys: {
      total: 0,
      available: 0,
      sold: 0
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Ошибка при загрузке статистики');
      }

      setStats(response.data.data);
      setError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Ошибка при загрузке статистики';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Обновляем статистику каждые 5 минут
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const adminModules = [
    {
      title: 'Пользователи',
      description: 'Управление пользователями системы',
      icon: 'users',
      path: '/admin/users',
      color: '#2196f3',
      stats: [
        { label: 'Всего', value: stats.users?.total || 0 },
        { label: 'Новых сегодня', value: stats.users?.newToday || 0 },
        { label: 'Активны сейчас', value: stats.users?.activeNow || 0 }
      ]
    },
    {
      title: 'Заказы',
      description: 'Просмотр и управление заказами',
      icon: 'orders',
      path: '/admin/orders',
      color: '#4caf50',
      stats: [
        { label: 'Всего', value: stats.orders?.total || 0 },
        { label: 'В обработке', value: stats.orders?.pending || 0 },
        { label: 'Выручка', value: `${stats.orders?.revenue || 0} ₽` }
      ]
    },
    {
      title: 'Игры',
      description: 'Управление каталогом игр',
      icon: 'games',
      path: '/admin/catalog',
      color: '#ff9800',
      stats: [
        { label: 'Всего', value: stats.games?.total || 0 },
        { label: 'Активных', value: stats.games?.active || 0 },
        { label: 'Нет в наличии', value: stats.games?.outOfStock || 0 }
      ]
    },
    {
      title: 'Ключи',
      description: 'Управление ключами активации',
      icon: 'keys',
      path: '/admin/keys',
      color: '#e91e63',
      stats: [
        { label: 'Всего', value: stats.keys?.total || 0 },
        { label: 'Доступно', value: stats.keys?.available || 0 },
        { label: 'Продано', value: stats.keys?.sold || 0 }
      ]
    }
  ];

  return {
    stats,
    loading,
    error,
    adminModules,
    refresh: fetchStats
  };
};
