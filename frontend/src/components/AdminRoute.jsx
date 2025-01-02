import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminRoute() {
  const location = useLocation();
  const { user, loading, isInitialized } = useSelector((state) => state.auth);
  
  // Показываем загрузку только при первой инициализации
  if (loading && !isInitialized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Если нет пользователя или роль не admin, перенаправляем
  if (!user || user.role !== 'admin') {
    // Сохраняем текущий путь для возврата после авторизации
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default AdminRoute;