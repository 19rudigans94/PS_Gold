import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { MaintenanceMode } from './components/MaintenanceMode';
import { useSettings } from './hooks/useSettings';
import { routes } from './routes/routes';

// Компонент загрузки
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  const { initialized } = useSelector((state) => state.auth);
  const { isInitialized: settingsInitialized } = useSettings();

  if (!initialized || !settingsInitialized) {
    return <LoadingSpinner />;
  }

  // Функция для рендеринга роутов
  const renderRoutes = (routes) => {
    return routes.map((route) => {
      const Element = route.element;

      return (
        <Route
          key={route.path || 'layout'}
          path={route.path}
          element={<Element />}
        >
          {route.children && renderRoutes(route.children)}
        </Route>
      );
    });
  };

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
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {renderRoutes(routes)}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </MaintenanceMode>
  );
}

export default App;