import { configureStore } from '@reduxjs/toolkit'
import { api } from './movies/movies.api'
import { moviesReducer } from './movies/movies'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    movies: moviesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch