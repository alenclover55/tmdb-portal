import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { moviesApi } from '../api/movie.api'

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
  },

  middleware: (getDefaultMiddleware)=>
  getDefaultMiddleware().concat(moviesApi.middleware)
})