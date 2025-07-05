// store/chipCriteriaSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/apis/axios';

// Async thunk to fetch criteria values
export const fetchChipCriteria = createAsyncThunk(
  'chipCriteria/fetch',
  async () => {
    const response = await axios.get('/api/radio-buttons/product/64b66e3c52b46f2c79eb2661'); // Replace with your API endpoint
    return response.data; // Expecting an object like { category: [...], price: [...], rating: [...] }
  }
);

const chipCriteriaSlice = createSlice({
  name: 'chipCriteria',
  initialState: {
    criteria: {}, // Stores fetched chip values
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChipCriteria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChipCriteria.fulfilled, (state, action) => {
        state.criteria = action.payload;
        state.loading = false;
      })
      .addCase(fetchChipCriteria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default chipCriteriaSlice.reducer;
