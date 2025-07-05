// store/cityCriteriaSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/apis/axios';

// Async thunk to fetch criteria values
export const fetchCityCriteria = createAsyncThunk(
  'cityCriteria/fetch',
  async () => {
    const response = await axios.get('/api/cities?sort=popular,desc&sort=label,asc&size=700'); // Replace with your API endpoint
    return response.data; // Expecting an object like { category: [...], price: [...], rating: [...] }
  }
);

const cityCriteriaSlice = createSlice({
  name: 'cityCriteria',
  initialState: {
    criteria: {}, // Stores fetched city values
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityCriteria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityCriteria.fulfilled, (state, action) => {
        state.criteria = action.payload;
        state.loading = false;
      })
      .addCase(fetchCityCriteria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cityCriteriaSlice.reducer;
