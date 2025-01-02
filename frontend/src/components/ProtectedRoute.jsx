import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;