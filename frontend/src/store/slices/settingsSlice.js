import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { settingsAPI } from '../../services/settingsAPI';

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      const settings = await settingsAPI.getSettings();
      return settings;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки настроек');
    }
  }
);

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (settingsData, { rejectWithValue }) => {
    try {
      const settings = await settingsAPI.updateSettings(settingsData);
      return settings;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка обновления настроек');
    }
  }
);

const initialState = {
  settings: null,
  isLoading: false,
  error: null,
  isInitialized: false
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Settings
      .addCase(fetchSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
        state.error = null;
        state.isInitialized = true;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isInitialized = true;
      })

      // Update Settings
      .addCase(updateSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
        state.error = null;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = settingsSlice.actions;

export default settingsSlice.reducer;
