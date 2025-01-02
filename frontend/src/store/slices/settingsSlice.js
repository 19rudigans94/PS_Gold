import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { settingsAPI } from '../../services/api';

// Начальное состояние
const initialState = {
  settings: {
    general: {
      siteName: '',
      contactEmail: '',
    },
    delivery: {
      defaultShippingMethod: 'standard',
      enableFreeShipping: false,
      deliveryPrice: 300,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
    },
    maintenance: {
      maintenanceMode: false,
      maintenanceMessage: '',
    }
  },
  isLoading: false,
  error: null,
  isInitialized: false
};

// Async thunks
export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await settingsAPI.getSettings();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (data, { rejectWithValue }) => {
    try {
      const response = await settingsAPI.updateSettings(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Slice
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    resetSettings: (state) => {
      state.settings = initialState.settings;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch settings
      .addCase(fetchSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
        state.isInitialized = true;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update settings
      .addCase(updateSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectSettings = (state) => state.settings.settings;
export const selectIsLoading = (state) => state.settings.isLoading;
export const selectError = (state) => state.settings.error;
export const selectIsInitialized = (state) => state.settings.isInitialized;

export const selectMaintenanceMode = (state) => state.settings.settings.maintenance.maintenanceMode;
export const selectMaintenanceMessage = (state) => state.settings.settings.maintenance.maintenanceMessage;
export const selectSiteName = (state) => state.settings.settings.general.siteName;
export const selectContactEmail = (state) => state.settings.settings.general.contactEmail;
export const selectDeliverySettings = (state) => state.settings.settings.delivery;
export const selectNotificationSettings = (state) => state.settings.settings.notifications;

export const { resetSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
