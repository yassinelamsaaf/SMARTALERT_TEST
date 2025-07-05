// store/BrandCriteriaSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/apis/axios';
// Async thunk to fetch criteria values
export const fetchBrandCriteria = createAsyncThunk(
  'brandCriteria/fetch',
  async () => {
    const response = await axios.get('/api/combo-lists/product/64b66e3c52b46f2c79eb2661'); // Replace with your API endpoint
    return response.data; // Expecting an object like { category: [...], price: [...], rating: [...] }
  }
);

const BrandCriteriaSlice = createSlice({
  name: 'BrandCriteria',
  initialState: {
    criteria: {}, // Stores fetched Brand values
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandCriteria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandCriteria.fulfilled, (state, action) => {
        state.criteria = action.payload;
        state.loading = false;
      })
      .addCase(fetchBrandCriteria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default BrandCriteriaSlice.reducer;
