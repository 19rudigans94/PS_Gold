import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutGrid, Package, Users, Settings, ShoppingCart, Key } from 'lucide-react';

function AdminLayout() {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: LayoutGrid, label: 'Дашборд' },
    { path: '/admin/catalog', icon: Package, label: 'Каталог' },
    { path: '/admin/game-keys', icon: Key, label: 'Цифровые ключи' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Заказы' },
    { path: '/admin/users', icon: Users, label: 'Пользователи' },
    { path: '/admin/settings', icon: Settings, label: 'Настройки' },
  ];

  return (
    <div className="flex bg-gray-100 mt-16">
      <aside className="w-64 bg-white shadow-md min-h-[calc(100vh-4rem)]">
        <div className="p-4">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Панель управления
          </h1>
        </div>
        <nav className="mt-2 px-2">
          <div className="space-y-1">
            {menuItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`
                    group flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon
                    className={`
                      mr-3 h-5 w-5
                      ${isActive
                        ? 'text-blue-700'
                        : 'text-gray-400 group-hover:text-gray-500'
                      }
                    `}
                  />
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;