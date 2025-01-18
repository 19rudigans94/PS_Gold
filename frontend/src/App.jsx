import React, { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { checkAuthStatus, setInitialized, logout } from './store/slices/authSlice';
import { TokenRefresher } from './components/auth/TokenRefresher';
import { router } from './routes/routes';
import { setLogoutCallback } from './services/api';

function App() {
  const dispatch = useDispatch();
  const { initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    // Устанавливаем callback для выхода
    setLogoutCallback(() => {
      dispatch(logout());
    });

    const initializeAuth = async () => {
      try {
        // Проверяем статус авторизации при загрузке приложения
        await dispatch(checkAuthStatus()).unwrap();
      } catch (error) {
        console.error('Failed to check auth status:', error);
      } finally {
        dispatch(setInitialized(true));
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (!initialized) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <TokenRefresher />
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
