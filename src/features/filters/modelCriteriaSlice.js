import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/apis/axios';

// Async thunk to fetch models based on cityId
export const fetchModels = createAsyncThunk(
  'criteria/fetchModels',
  async (cityId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/valeurs/comboListParent/${ cityId }`);
      return response.data; // Assuming the API returns a list of models
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch models');
    }
  }
);

const modelCriteriaSlice = createSlice({
  name: 'modelCriteria',
  initialState: {
    models: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // Action to reset models
    resetModels: (state) => {
      state.models = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModels.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.models = action.payload;
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetModels } = modelCriteriaSlice.actions;
export default modelCriteriaSlice.reducer;
