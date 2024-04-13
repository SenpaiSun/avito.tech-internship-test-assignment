import { configureStore } from '@reduxjs/toolkit'
import { moviesReducer } from './movies/movies'
import { filtersReducer } from './movies/filters';
import { searchResultReducer } from './movies/searchResult';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    filters: filtersReducer,
    searchResult: searchResultReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch