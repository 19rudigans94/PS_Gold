import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoadingSpinner } from '../ui/LoadingSpinner';

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isAdmin, isLoading, initialized } = useSelector(state => state.auth);

  if (!initialized || isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    // Сохраняем текущий путь для редиректа после авторизации
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    // Если пользователь авторизован, но не админ, редиректим на главную
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
