import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  games: [],
  game: null,
  isLoading: false,
  error: null,
  filters: {
    search: '',
    genre: '',
    platform: '',
    priceRange: [0, 10000],
    sortBy: 'createdAt',
    sortOrder: 'desc'
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0
  }
};

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async ({ page = 1, limit = 12, filters = {} }, { rejectWithValue }) => {
    try {
      const params = {
        page,
        limit,
        ...filters
      };

      // Преобразование параметров для API
      if (params.priceRange) {
        params.minPrice = params.priceRange[0];
        params.maxPrice = params.priceRange[1];
        delete params.priceRange;
      }

      const response = await api.get('/games', { params });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch games');
      }

      return {
        games: response.data.data,
        total: response.data.total || response.data.data.length,
        page,
        limit
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Ошибка загрузки игр');
    }
  }
);

export const fetchGameById = createAsyncThunk(
  'games/fetchGameById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/games/${id}`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch game');
      }

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Ошибка загрузки игры');
    }
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.page = 1;
    },
    clearGameDetails: (state) => {
      state.game = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Обработка fetchGames
      .addCase(fetchGames.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.games = action.payload.games;
        state.pagination = {
          ...state.pagination,
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total
        };
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка загрузки игр';
      })
      // Обработка fetchGameById
      .addCase(fetchGameById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGameById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.game = action.payload;
      })
      .addCase(fetchGameById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка загрузки игры';
      });
  }
});

export const { setFilters, setPage, resetFilters, clearGameDetails } = gamesSlice.actions;
export default gamesSlice.reducer;
