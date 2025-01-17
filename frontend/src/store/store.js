import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import gamesReducer from './slices/gamesSlice';
import ordersReducer from './slices/ordersSlice';
import usersReducer from './slices/usersSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    games: gamesReducer,
    orders: ordersReducer,
    users: usersReducer,
    settings: settingsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'auth/login/fulfilled',
          'auth/register/fulfilled',
          'auth/checkStatus/fulfilled'
        ],
        ignoredPaths: ['auth.user', 'auth.error']
      },
    }),
});
