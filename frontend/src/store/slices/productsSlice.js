import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsAPI } from '../../services/api';

export const fetchGames = createAsyncThunk(
  'products/fetchGames',
  async (_, { rejectWithValue }) => {
    try {
      const data = await productsAPI.getGames();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchConsoles = createAsyncThunk(
  'products/fetchConsoles',
  async (_, { rejectWithValue }) => {
    try {
      const data = await productsAPI.getConsoles();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  games: [],
  consoles: [],
  loading: false,
  error: null
};

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
        state.error = action.payload;
      })
      // Consoles
      .addCase(fetchConsoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConsoles.fulfilled, (state, action) => {
        state.loading = false;
        state.consoles = action.payload;
      })
      .addCase(fetchConsoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default productsSlice.reducer;
