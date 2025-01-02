import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contactAPI } from '../../services/api';

export const sendContactMessage = createAsyncThunk(
  'contact/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await contactAPI.sendMessage(messageData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  success: false
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendContactMessage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetStatus } = contactSlice.actions;
export default contactSlice.reducer;
