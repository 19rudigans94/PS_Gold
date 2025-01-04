import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus, setInitialized } from '../store/slices/authSlice';
import Cookies from 'js-cookie';

function AuthCheck({ children }) {
  const dispatch = useDispatch();
  const { initialized } = useSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('authToken');
        if (token) {
          await dispatch(checkAuthStatus()).unwrap();
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        dispatch(setInitialized());
        setIsChecking(false);
      }
    };

    if (!initialized) {
      checkAuth();
    } else {
      setIsChecking(false);
    }
  }, [dispatch, initialized]);

  if (isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return children;
}

export default AuthCheck;
