import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { WithSuspense } from '../components/ui/WithSuspense';
import { AuthCheck } from '../components/auth/AuthCheck';

const Login = lazy(() => import('../pages/login/Login'));
const Register = lazy(() => import('../pages/register/Register'));
const Home = lazy(() => import('../pages/home/Home'));
const Profile = lazy(() => import('../pages/profile/Profile'));
const ProtectedRoute = lazy(() => import('../components/auth/ProtectedRoute'));
const AdminRoute = lazy(() => import('../components/auth/AdminRoute'));
const Games = lazy(() => import('../pages/games/Games'));
const Contact = lazy(() => import('../pages/contact/Contact'));
const Cart = lazy(() => import('../pages/cart/Cart'));
const Orders = lazy(() => import('../pages/orders/Orders'));
// const GameDetails = lazy(() => import('../pages/games/GameDetails'));

const AdminDashboard = lazy(() => import('../pages/admin/dashboard/Dashboard'));
const AdminUsers = lazy(() => import('../pages/admin/users/Users'));
const AdminOrders = lazy(() => import('../pages/admin/orders/Orders'));
const AdminCatalog = lazy(() => import('../pages/admin/catalog/Catalog'));
const AdminGameKeys = lazy(() => import('../pages/admin/game-keys/GameKeys'));
const AdminSettings = lazy(() => import('../pages/admin/settings/Settings'));
const AdminLayout = lazy(() => import('../components/layout/AdminLayout'));
const AddGame = lazy(() => import('../pages/admin/add-game/AddGame'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WithSuspense><MainLayout /></WithSuspense>,
    children: [
      {
        index: true,
        element: <WithSuspense><Home /></WithSuspense>,
      },
      {
        path: 'games',
        element: <WithSuspense><Games /></WithSuspense>,
      },
      {
        path: 'contact',
        element: <WithSuspense><Contact /></WithSuspense>,
      },
      // {
      //   path: 'games/:id',
      //   element: <WithSuspense><GameDetails /></WithSuspense>,
      // },
      {
        path: 'login',
        element: (
          <WithSuspense>
            <AuthCheck>
              <Login />
            </AuthCheck>
          </WithSuspense>
        )
      },
      {
        path: 'register',
        element: (
          <WithSuspense>
            <AuthCheck>
              <Register />
            </AuthCheck>
          </WithSuspense>
        )
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <WithSuspense><Profile /></WithSuspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <WithSuspense><Cart /></WithSuspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <WithSuspense><Orders /></WithSuspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <WithSuspense><AdminLayout /></WithSuspense>
          </AdminRoute>
        ),
        children: [
          {
            path: 'dashboard',
            element: <WithSuspense><AdminDashboard /></WithSuspense>
          },
          {
            path: 'users',
            element: <WithSuspense><AdminUsers /></WithSuspense>
          },
          {
            path: 'orders',
            element: <WithSuspense><AdminOrders /></WithSuspense>
          },
          {
            path: 'catalog',
            element: <WithSuspense><AdminCatalog /></WithSuspense>
          },
          {
            path: 'game-keys',
            element: <WithSuspense><AdminGameKeys /></WithSuspense>
          },
          {
            path: 'settings',
            element: <WithSuspense><AdminSettings /></WithSuspense>
          },
          {
            path: 'add-game',
            element: <WithSuspense><AddGame /></WithSuspense>
          }
        ]
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);
