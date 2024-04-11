import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchFilters: {
    page: 1,
    limit: 10
  },
  reviewFilters: {
    page: 1,
    limit: 1
  }
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.searchFilters.page = action.payload;
    }
  }
});

export const filtersActions = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
