import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: false,
  initialized: false,
  error: null
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
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка выхода');
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/me');
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
        if (action.payload.success) {
          state.isLoading = false;
          state.error = null;
          toast.success('Успешная регистрация');
        } else {
          state.isLoading = false;
          state.error = action.payload.message || 'Неизвестная ошибка';
          toast.error(state.error);
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
        if (action.payload.success && action.payload.data?.user) {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload.data.user;
          state.isAdmin = action.payload.data.user.role === 'admin';
          state.error = null;
          toast.success('Успешный вход в систему');
        } else {
          state.isLoading = false;
          state.error = action.payload.message || 'Неизвестная ошибка';
          toast.error(state.error);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.isAdmin = false;
        toast.error(action.payload);
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isAdmin = false;
        state.error = null;
        toast.success('Успешный выход из системы');
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        if (action.payload.success && action.payload.data?.user) {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload.data.user;
          state.isAdmin = action.payload.data.user.role === 'admin';
          state.error = null;
        } else {
          state.isLoading = false;
          state.error = action.payload.message || 'Неизвестная ошибка';
        }
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isAdmin = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.error = null;
          state.user = action.payload.data.user;
          toast.success('Успешное обновление профиля');
        } else {
          state.isLoading = false;
          state.error = action.payload.message || 'Неизвестная ошибка';
          toast.error(state.error);
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  }
});

export const { setInitialized, resetError } = authSlice.actions;
export default authSlice.reducer;
