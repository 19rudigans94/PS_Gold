import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Package, ShoppingBag, Settings } from 'lucide-react';

function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Главная' },
    { path: '/admin/users', icon: Users, label: 'Пользователи' },
    { path: '/admin/orders', icon: Package, label: 'Заказы' },
    { path: '/admin/catalog', icon: ShoppingBag, label: 'Каталог' },
    { path: '/admin/settings', icon: Settings, label: 'Настройки' }
  ];

  return (
    <nav className="space-y-1">
      {menuItems.map(({ path, icon: Icon, label }) => {
        const isActive = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className={`
              flex items-center px-4 py-3 text-sm font-medium rounded-lg
              transition-all duration-200 ease-in-out
              ${isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <Icon
              className={`h-5 w-5 mr-3 ${
                isActive ? 'text-blue-600' : 'text-gray-400'
              }`}
            />
            <span>{label}</span>
            {isActive && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export default AdminSidebar;