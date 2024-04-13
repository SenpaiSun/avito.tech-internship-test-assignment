import { createSlice } from '@reduxjs/toolkit';
import { Filters } from './type';

const initialState: Filters = {
  searchFilters: {
    page: 1,
    limit: 10,
  },
  reviewFilters: {
    page: 1,
    limit: 1
  },
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.searchFilters.page = action.payload;
    },
    setLimit : (state, action) => {
      state.searchFilters.limit = action.payload
    }
  }
});

export const filtersActions = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
