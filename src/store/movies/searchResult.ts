import { createSlice } from '@reduxjs/toolkit';
import { Movie } from './type';

const initialState: {searchValue: string, result: Movie[], loader: boolean} = {
  searchValue: '',
  result: [],
  loader: false
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
    }
  },
});

export const searchResultActions = searchResultSlice.actions;
export const searchResultReducer = searchResultSlice.reducer