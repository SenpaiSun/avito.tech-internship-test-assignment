import { createSlice } from '@reduxjs/toolkit';
import { Movie, searchResult } from './type';

const initialState: searchResult = {
  searchValue: '',
  result: [],
  loader: false,
  currentMovie: {
    infoMovie: {},
    posters: [],
    review: {
      docs: [],
      limit: 1,
      page: 1,
      pages: 0,
      total: 0
    }
  },
  series: [],
};

export const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setResult: (state, action) => {
      state.result = action.payload
    },
    setLoader: (state, action) => {
      state.loader = action.payload
    },
    setCurrentMovie: (state, action) => {
      state.currentMovie['infoMovie'] = action.payload
    },
    setPosters: (state, action) => {
      state.currentMovie['posters'] = action.payload.docs
    },
    setReview: (state, action) => {
      state.currentMovie['review'] = action.payload
    },
    setSeries: (state, action) => {
      state.series = action.payload.docs
    },
    setPageReview: (state, action) => {
      state.currentMovie['review']['page'] = action.payload
    }
  },
});

export const searchResultActions = searchResultSlice.actions;
export const searchResultReducer = searchResultSlice.reducer