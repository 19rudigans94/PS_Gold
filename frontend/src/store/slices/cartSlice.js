import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        toast.info('Игра уже в корзине');
        return;
      }

      state.items.push({
        ...newItem,
        quantity: 1,
        totalPrice: newItem.price * (1 - (newItem.discount || 0) / 100)
      });
      
      state.totalQuantity++;
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );

      toast.success('Игра добавлена в корзину');
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (!existingItem) {
        return;
      }

      state.items = state.items.filter(item => item.id !== id);
      state.totalQuantity--;
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );

      toast.success('Игра удалена из корзины');
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      
      toast.success('Корзина очищена');
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
