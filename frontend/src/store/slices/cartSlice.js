import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  try {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

const saveCartToLocalStorage = (items) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const initialState = {
  items: loadCartFromLocalStorage(),
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        item =>
          item.id === action.payload.id && item.type === action.payload.type
      );
      
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
        if (action.payload.type === 'console') {
          existingItem.rentalDays = action.payload.rentalDays;
          existingItem.totalPrice = action.payload.price * existingItem.rentalDays;
        }
      } else {
        state.items.push({ 
          ...action.payload, 
          quantity: 1,
          totalPrice: action.payload.type === 'console' 
            ? action.payload.price * action.payload.rentalDays 
            : action.payload.price
        });
      }
      saveCartToLocalStorage(state.items);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        if (item.type === 'console') {
          item.totalPrice = item.price * item.rentalDays * quantity;
        } else {
          item.totalPrice = item.price * quantity;
        }
      }
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart,
  setLoading,
  setError 
} = cartSlice.actions;

export default cartSlice.reducer;
