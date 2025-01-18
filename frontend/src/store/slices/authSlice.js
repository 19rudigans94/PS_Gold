import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: false,
  initialized: false,
  error: null,
  tokenExpiration: null
};

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка обновления профиля');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка регистрации');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка входа');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка выхода');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/refresh-token');
      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка обновления токена');
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/me');
      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка проверки статуса');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
    setTokenExpiration: (state, action) => {
      state.tokenExpiration = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.isLoading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.isAdmin = action.payload.user.role === 'admin';
          state.error = null;
          state.tokenExpiration = action.payload.tokenExpiration;
          toast.success('Успешная регистрация');
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.isLoading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.isAdmin = action.payload.user.role === 'admin';
          state.error = null;
          state.tokenExpiration = action.payload.tokenExpiration;
          toast.success('Успешный вход');
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.error = null;
        state.tokenExpiration = null;
        toast.success('Выход выполнен успешно');
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
      })

      // Check Auth Status
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.isAdmin = action.payload.user.role === 'admin';
          state.error = null;
          state.tokenExpiration = action.payload.tokenExpiration;
        }
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.error = null;
        state.tokenExpiration = null;
      })

      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        if (action.payload.tokenExpiration) {
          state.tokenExpiration = action.payload.tokenExpiration;
          state.error = null;
        }
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.error = action.payload;
        state.tokenExpiration = null;
      })

      // Update Profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
          state.error = null;
          toast.success('Профиль обновлен успешно');
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
      });
  }
});

export const { setInitialized, resetError, setTokenExpiration } = authSlice.actions;
export default authSlice.reducer;
