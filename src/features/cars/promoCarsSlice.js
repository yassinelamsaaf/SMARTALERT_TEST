// store/promoCarsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/apis/axios';
import { mapNewCarToCarCard } from '@/utils/mapper';

// Async thunk to fetch promo cars values
export const fetchPromoCars = createAsyncThunk(
  'promoCars/fetch',
  async (lang) => {
    const response = await axios.get('/api/new/announcements/promo?page=0&size=20'); // Replace with your API endpoint
    let data = response.data, carsCards = [];
    for (let i = 0; i < data?.length; i++) {
      const element = mapNewCarToCarCard(data[i], lang);
      carsCards.push(element)
    }
    return carsCards; // Expecting an object like { category: [...], price: [...], rating: [...] }
  }
);

const promoCarsSlice = createSlice({
  name: 'promoCars',
  initialState: {
    promoCars: [], // Stores fetched source values
    loadingPromoCars: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromoCars.pending, (state) => {
        state.loadingPromoCars = true;
        state.error = null;
      })
      .addCase(fetchPromoCars.fulfilled, (state, action) => {
        state.promoCars = action.payload;
        state.loadingPromoCars = false;
      })
      .addCase(fetchPromoCars.rejected, (state, action) => {
        state.loadingPromoCars = false;
        state.error = action.error.message;
      });
  },
});

export default promoCarsSlice.reducer;
