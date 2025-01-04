import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import contactReducer from './slices/contactSlice';
import orderReducer from './slices/orderSlice';
import settingsReducer from './slices/settingsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    contact: contactReducer,
    orders: orderReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорируем определенные action types
        ignoredActions: ['auth/checkStatus/fulfilled', 'auth/loginUser/fulfilled', 'auth/registerUser/fulfilled'],
        // Игнорируем определенные пути в state
        ignoredPaths: ['auth.user'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
