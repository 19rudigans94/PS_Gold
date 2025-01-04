import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsAPI } from '../../services/api';

// Асинхронные actions
export const fetchGames = createAsyncThunk(
  'products/fetchGames',
  async () => {
    try {
      const data = await productsAPI.getGames();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

// Начальное состояние
const initialState = {
  games: [],
  loading: false,
  error: null,
};

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Games
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default productsSlice.reducer;
