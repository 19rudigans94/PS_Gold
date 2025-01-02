import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from './store/slices/authSlice';
import { MaintenanceMode } from './components/MaintenanceMode';
import { useSettings } from './hooks/useSettings';

const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const Home = lazy(() => import('./pages/Home'));
const Games = lazy(() => import('./pages/Games'));
const Consoles = lazy(() => import('./pages/Consoles'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const Profile = lazy(() => import('./pages/Profile'));
const Tracking = lazy(() => import('./pages/Tracking'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AdminLayout = lazy(() => import('./pages/admin/Layout'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));
const AdminOrders = lazy(() => import('./pages/admin/Orders'));
const AdminCatalog = lazy(() => import('./pages/admin/Catalog'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));
const AdminGameKeys = lazy(() => import('./pages/admin/GameKeys'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const AdminRoute = lazy(() => import('./components/AdminRoute'));

function App() {
  const dispatch = useDispatch();
  const { isInitialized: authInitialized } = useSelector((state) => state.auth);
  const { isInitialized: settingsInitialized } = useSettings();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (!authInitialized || !settingsInitialized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <MaintenanceMode>
      <div className="min-h-screen bg-gray-100">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <Routes>
            {/* Публичные маршруты */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route
              path="/games"
              element={
                <>
                  <Navbar />
                  <Games />
                  <Footer />
                </>
              }
            />
            <Route
              path="/consoles"
              element={
                <>
                  <Navbar />
                  <Consoles />
                  <Footer />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <Navbar />
                  <Contact />
                  <Footer />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Защищенные маршруты */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/cart"
                element={
                  <>
                    <Navbar />
                    <Cart />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <Navbar />
                    <Profile />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/tracking"
                element={
                  <>
                    <Navbar />
                    <Tracking />
                    <Footer />
                  </>
                }
              />
            </Route>

            {/* Админ маршруты */}
            <Route path="/admin" element={
              <>
                <Navbar />
                <AdminRoute />
              </>
            }>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="catalog" element={<AdminCatalog />} />
                <Route path="game-keys" element={<AdminGameKeys />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </div>
    </MaintenanceMode>
  );
}

export default App;