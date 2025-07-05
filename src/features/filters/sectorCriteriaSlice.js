import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch sectors based on cityId
export const fetchSectors = createAsyncThunk(
  'criteria/fetchSectors',
  async (cityId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/sectors`, { params: { cityId } });
      return response.data; // Assuming the API returns a list of sectors
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch sectors');
    }
  }
);

const sectorCriteriaSlice = createSlice({
  name: 'sectorCriteria',
  initialState: {
    sectors: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // Action to reset sectors
    resetSectors: (state) => {
      state.sectors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSectors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sectors = action.payload;
      })
      .addCase(fetchSectors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSectors } = sectorCriteriaSlice.actions;
export default sectorCriteriaSlice.reducer;
