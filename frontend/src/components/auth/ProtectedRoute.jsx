import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoadingSpinner } from '../ui/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading, initialized } = useSelector(state => state.auth);

  if (!initialized || isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    // Сохраняем текущий путь для редиректа после авторизации
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
