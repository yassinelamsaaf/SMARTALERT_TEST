// store/sourceCriteriaSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/apis/axios';

// Async thunk to fetch criteria values
export const fetchSourceCriteria = createAsyncThunk(
  'sourceCriteria/fetch',
  async () => {
    const response = await axios.get('/api/sources'); // Replace with your API endpoint
    return response.data; // Expecting an object like { category: [...], price: [...], rating: [...] }
  }
);

const sourceCriteriaSlice = createSlice({
  name: 'sourceCriteria',
  initialState: {
    criteria: [], // Stores fetched source values
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSourceCriteria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSourceCriteria.fulfilled, (state, action) => {
        state.criteria = action.payload;
        state.loading = false;
      })
      .addCase(fetchSourceCriteria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default sourceCriteriaSlice.reducer;
