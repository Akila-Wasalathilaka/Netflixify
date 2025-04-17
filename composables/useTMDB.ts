import type { Movie, MovieListResponse } from '~/types/movie'

export const useTmdb = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.tmdbBaseUrl
  const apiKey = config.public.tmdbApiKey

  const fetchPopularMovies = async (): Promise<MovieListResponse> => {
    return await $fetch(`${baseUrl}/movie/popular`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page: 1
      }
    })
  }

  const fetchMovieDetails = async (id: number): Promise<Movie> => {
    return await $fetch(`${baseUrl}/movie/${id}`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        append_to_response: 'videos,credits'
      }
    })
  }

  const fetchTrendingMovies = async (): Promise<MovieListResponse> => {
    return await $fetch(`${baseUrl}/trending/movie/day`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page: 1
      }
    })
  }

  return {
    fetchPopularMovies,
    fetchMovieDetails,
    fetchTrendingMovies

  }
}