// uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isLoadingFilters: false,
    isLoadingCars: false,
    errorMessage: null,
  },
  reducers: {
    setLoadingFilters: (state, action) => {
      state.isLoadingFilters = action.payload;
    },
    setLoadingCars: (state, action) => {
        state.isLoadingCars = action.payload;
      },
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearError: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { setLoadingFilters, setLoadingCars, setError, clearError } = uiSlice.actions;
export default uiSlice.reducer;
