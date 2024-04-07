import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const { REACT_APP_API_TOKEN } = process.env;
console.log(REACT_APP_API_TOKEN)

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.kinopoisk.dev/',
    prepareHeaders: headers => {
      if (REACT_APP_API_TOKEN) {
        headers.set('X-API-KEY', REACT_APP_API_TOKEN);
      }
      return headers;
    }
  }),
  tagTypes: ['Movies'],
  endpoints: (builder) => ({
    getMovies: builder.query<any, { page: number, limit: number }>({
      query: ({page, limit}) => `v1.4/movie?page=${page}&limit=${limit}`,
      providesTags: ['Movies']
    })
  })
});

export const { useGetMoviesQuery } = api

