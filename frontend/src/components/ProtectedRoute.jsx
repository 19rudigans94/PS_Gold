import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const token = Cookies.get('authToken');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;