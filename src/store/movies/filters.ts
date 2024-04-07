import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  limit: 10
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
  },
});

export const filtersActions = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer