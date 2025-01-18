import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../../store/slices/authSlice';

const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 минут

export const TokenRefresher = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, tokenExpiration } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !tokenExpiration) return;

    const timeUntilExpiration = new Date(tokenExpiration).getTime() - Date.now();
    const refreshTime = Math.max(timeUntilExpiration - (5 * 60 * 1000), 0); // Обновляем за 5 минут до истечения

    const refreshTimeout = setTimeout(() => {
      dispatch(refreshToken());
    }, refreshTime);

    return () => clearTimeout(refreshTimeout);
  }, [dispatch, isAuthenticated, tokenExpiration]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const intervalId = setInterval(() => {
      dispatch(refreshToken());
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [dispatch, isAuthenticated]);

  return null;
};
