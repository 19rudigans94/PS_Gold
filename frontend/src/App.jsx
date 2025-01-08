import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { checkAuthStatus, setInitialized } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { initialized } = useSelector((state) => state.auth);

  useEffect(() => {
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
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
