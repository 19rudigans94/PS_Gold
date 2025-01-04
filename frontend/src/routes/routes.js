import { lazy } from 'react';

// Компоненты
const components = {
  ProtectedRoute: lazy(() => import('../components/ProtectedRoute')),
  AdminRoute: lazy(() => import('../components/AdminRoute'))
};

// Лэйауты
const layouts = {
  MainLayout: lazy(() => import('../layouts/MainLayout')),
  AdminLayout: lazy(() => import('../layouts/AdminLayout'))
};

// Страницы
const pages = {
  // Публичные страницы
  public: {
    Home: lazy(() => import('../pages/Home')),
    Games: lazy(() => import('../pages/Games')),
    Contact: lazy(() => import('../pages/Contact')),
    Login: lazy(() => import('../pages/Login')),
    Register: lazy(() => import('../pages/Register'))
  },
  // Защищенные страницы
  protected: {
    Cart: lazy(() => import('../pages/Cart')),
    Profile: lazy(() => import('../pages/Profile'))
  },
  // Админ страницы
  admin: {
    Dashboard: lazy(() => import('../pages/admin/Dashboard')),
    Users: lazy(() => import('../pages/admin/Users')),
    Orders: lazy(() => import('../pages/admin/Orders')),
    Catalog: lazy(() => import('../pages/admin/Catalog')),
    Settings: lazy(() => import('../pages/admin/Settings')),
    GameKeys: lazy(() => import('../pages/admin/GameKeys'))
  }
};

// Конфигурация роутов
export const routes = [
  // Основной лэйаут
  {
    element: layouts.MainLayout,
    children: [
      // Публичные маршруты
      {
        path: '/',
        element: pages.public.Home,
        public: true
      },
      {
        path: '/games',
        element: pages.public.Games,
        public: true
      },
      {
        path: '/contact',
        element: pages.public.Contact,
        public: true
      },
      {
        path: '/login',
        element: pages.public.Login,
        public: true
      },
      {
        path: '/register',
        element: pages.public.Register,
        public: true
      },

      // Защищенные маршруты
      {
        element: components.ProtectedRoute,
        children: [
          {
            path: '/cart',
            element: pages.protected.Cart
          },
          {
            path: '/profile',
            element: pages.protected.Profile
          }
        ]
      }
    ]
  },

  // Админ маршруты
  {
    path: '/admin',
    element: components.AdminRoute,
    children: [
      {
        element: layouts.AdminLayout,
        children: [
          {
            path: '',
            element: pages.admin.Dashboard
          },
          {
            path: 'users',
            element: pages.admin.Users
          },
          {
            path: 'orders',
            element: pages.admin.Orders
          },
          {
            path: 'catalog',
            element: pages.admin.Catalog
          },
          {
            path: 'settings',
            element: pages.admin.Settings
          },
          {
            path: 'game-keys',
            element: pages.admin.GameKeys
          }
        ]
      }
    ]
  }
];

export { components, layouts, pages };
