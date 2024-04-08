import { createSlice } from '@reduxjs/toolkit';
import { Movies } from './type';

const initialState: Movies = {
  docs: [],
  limit: 0,
  page: 0,
  pages: 0,
  total: 0,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.docs = action.payload.docs
      state.limit = action.payload.limit
      state.page = action.payload.page
      state.pages = action.payload.pages
      state.total = action.payload.total
      console.log('Значение установено!', state, action.payload)
    },
  },
});

export const moviesActions = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer