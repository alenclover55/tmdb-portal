import { current } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const moviesApi = createApi({
    reducerPath: 'moviesApi',

    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
      getTrends: builder.query({
        query: (trendsType)=> ({
          url: `trending/movie/${trendsType}`,
          params: {
            language: 'ru-RU'
          },
          headers:{
            "Content-Type": "application/json",
            Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODc2MmU0NDIwZWJhYTM4ZWI5ZmFiZGI2NDNkNWQ2ZiIsInN1YiI6IjY0YmQ2N2FhZWI3OWMyMDEzOTZhZTk1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zxo2DNq8zPtrtQiFNrAIRyxPYJhiqD8NI7LFI126fF8`
          }
        }),
      }),
      getFilm: builder.query({
        query:(id)=>({
          url: `movie/${id}`,
          params: {
            language: 'ru-RU'
          },
          headers:{
            "Content-Type": "application/json",
            Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODc2MmU0NDIwZWJhYTM4ZWI5ZmFiZGI2NDNkNWQ2ZiIsInN1YiI6IjY0YmQ2N2FhZWI3OWMyMDEzOTZhZTk1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zxo2DNq8zPtrtQiFNrAIRyxPYJhiqD8NI7LFI126fF8`
          }
        })
      }),
      getFilmCredits: builder.query({
        query :(id)=>({
          url: `movie/${id}/credits`,
          params:{
            language: 'ru-RU',
          },
          headers:{
            "Content-Type": "application/json",
            Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODc2MmU0NDIwZWJhYTM4ZWI5ZmFiZGI2NDNkNWQ2ZiIsInN1YiI6IjY0YmQ2N2FhZWI3OWMyMDEzOTZhZTk1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zxo2DNq8zPtrtQiFNrAIRyxPYJhiqD8NI7LFI126fF8`
          }
        })
      }),
      getAllActors: builder.query({
        query : (currentPage = 1)=>({
          url:`person/popular`,
          params:{
            page: currentPage,
            language: 'ru-RU',
          },
          headers:{
            "Content-Type": "application/json",
            Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODc2MmU0NDIwZWJhYTM4ZWI5ZmFiZGI2NDNkNWQ2ZiIsInN1YiI6IjY0YmQ2N2FhZWI3OWMyMDEzOTZhZTk1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zxo2DNq8zPtrtQiFNrAIRyxPYJhiqD8NI7LFI126fF8`
          }
        }),
      }),
      getActorDetails: builder.query({
        query:(id)=>({
          url:`person/${id}`,
          params:{
            language: 'ru-RU',
          },
          headers:{
            "Content-Type": "application/json",
            Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODc2MmU0NDIwZWJhYTM4ZWI5ZmFiZGI2NDNkNWQ2ZiIsInN1YiI6IjY0YmQ2N2FhZWI3OWMyMDEzOTZhZTk1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zxo2DNq8zPtrtQiFNrAIRyxPYJhiqD8NI7LFI126fF8`
          }

        })
      }), 
      getActorCreditsFilms: builder.query({
        query:(id)=>({
          url:`person/${id}/movie_credits`,
          params:{
            language: 'ru-RU',
          },
          headers:{
            "Content-Type": "application/json",
            Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODc2MmU0NDIwZWJhYTM4ZWI5ZmFiZGI2NDNkNWQ2ZiIsInN1YiI6IjY0YmQ2N2FhZWI3OWMyMDEzOTZhZTk1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zxo2DNq8zPtrtQiFNrAIRyxPYJhiqD8NI7LFI126fF8`
          }
        })
      }),
      getAllMovies: builder.query({
        query:(obj)=>({
          url: `movie/${obj.type}`,
          params: {
            language: 'ru-RU', 
            page: obj.currentPage,
          }, 
          headers:{
          "Content-Type": "application/json",
          Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODc2MmU0NDIwZWJhYTM4ZWI5ZmFiZGI2NDNkNWQ2ZiIsInN1YiI6IjY0YmQ2N2FhZWI3OWMyMDEzOTZhZTk1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zxo2DNq8zPtrtQiFNrAIRyxPYJhiqD8NI7LFI126fF8`
          }
        })
      }),
      getSearchMovie: builder.query({
        query:(obj)=>({
          url: `search/movie`,
          params: {
            query: obj.updatedSearch, 
            language: 'ru-RU',
            page: obj.currentPage,
          }, 
          headers:{
          "Content-Type": "application/json",
          Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODc2MmU0NDIwZWJhYTM4ZWI5ZmFiZGI2NDNkNWQ2ZiIsInN1YiI6IjY0YmQ2N2FhZWI3OWMyMDEzOTZhZTk1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zxo2DNq8zPtrtQiFNrAIRyxPYJhiqD8NI7LFI126fF8`
          }
        })
      }),
      getSearchActors: builder.query({
        query:(obj)=>({
          url: `search/person`,
          params: {
            query: obj.updatedSearch, 
            language: 'ru-RU',
            page: obj.currentPage,
          }, 
          headers:{
          "Content-Type": "application/json",
          Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODc2MmU0NDIwZWJhYTM4ZWI5ZmFiZGI2NDNkNWQ2ZiIsInN1YiI6IjY0YmQ2N2FhZWI3OWMyMDEzOTZhZTk1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zxo2DNq8zPtrtQiFNrAIRyxPYJhiqD8NI7LFI126fF8`
          }
        })
      }),
      })  
  })

export const { useGetTrendsQuery, useGetFilmQuery, useGetFilmCreditsQuery, useGetAllActorsQuery, useGetActorDetailsQuery, useGetActorCreditsFilmsQuery, useGetAllMoviesQuery, useGetSearchMovieQuery,useGetSearchActorsQuery} = moviesApi;



