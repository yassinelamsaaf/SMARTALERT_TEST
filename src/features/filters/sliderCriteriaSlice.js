// store/sliderCriteriaSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/apis/axios';

// Async thunk to fetch criteria values
export const fetchSliderCriteria = createAsyncThunk(
  'sliderCriteria/fetch',
  async () => {
    const response = await axios.get('/api/sliders/product/64b66e3c52b46f2c79eb2661'); // Replace with your API endpoint
    return response.data; // Expecting an object like { category: [...], price: [...], rating: [...] }
  }
);

const sliderCriteriaSlice = createSlice({
  name: 'sliderCriteria',
  initialState: {
    criteria: {}, // Stores fetched slider values
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliderCriteria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSliderCriteria.fulfilled, (state, action) => {
        state.criteria = action.payload;
        state.loading = false;
      })
      .addCase(fetchSliderCriteria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default sliderCriteriaSlice.reducer;
