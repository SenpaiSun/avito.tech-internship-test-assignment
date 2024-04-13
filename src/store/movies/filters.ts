import { createSlice } from '@reduxjs/toolkit';
import { Filters } from './type';

const initialState: Filters = {
  searchFilters: {
    page: 1,
    limit: 10,
    year: '',
    genres: '',
    countries: '',
    ageRating: ''
  },
  reviewFilters: {
    page: 1,
    limit: 1
  },
  searchUrl: '',
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
    },
    setYear: (state, action) => {
      state.searchFilters.year = action.payload
    },
    setGenre: (state, action) => {
      state.searchFilters.genres = action.payload
    },
    setCountry: (state, action) => {
      state.searchFilters.countries = action.payload
    },
    setAge: (state, action) => {
      console.log(action.payload)
      state.searchFilters.ageRating = action.payload.replace('+', '');
    },
    setSearchUrl: (state, action) => {
      state.searchUrl = action.payload
    }
  }
});

export const filtersActions = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
