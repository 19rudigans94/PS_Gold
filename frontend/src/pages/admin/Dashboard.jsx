import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Package, ShoppingBag, Settings, TrendingUp } from 'lucide-react';
import Analytics from './components/Analytics';

function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Всего пользователей',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: Users,
      path: '/admin/users'
    },
    {
      title: 'Активные заказы',
      value: '23',
      change: '+5%',
      trend: 'up',
      icon: Package,
      path: '/admin/orders'
    },
    {
      title: 'Товары',
      value: '89',
      change: '+8%',
      trend: 'up',
      icon: ShoppingBag,
      path: '/admin/catalog'
    },
    {
      title: 'Выручка',
      value: '₽12,430',
      change: '+23%',
      trend: 'up',
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-8">
      {/* Заголовок */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Панель управления</h1>
        <p className="mt-1 text-sm text-gray-500">
          Добро пожаловать в панель управления
        </p>
      </div>

      {/* Сетка статистики */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            onClick={() => stat.path && navigate(stat.path)}
            className={`
              relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden
              ${stat.path ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
            `}
          >
            <dt>
              <div className="absolute bg-blue-500 rounded-md p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {stat.title}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p
                className={`
                  ml-2 flex items-baseline text-sm font-semibold
                  ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}
                `}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Аналитика */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Аналитика продаж
        </h2>
        <Analytics />
      </div>
    </div>
  );
}

export default AdminDashboard;