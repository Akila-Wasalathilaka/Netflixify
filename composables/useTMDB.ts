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

  const fetchTopRatedMovies = async (): Promise<MovieListResponse> => {
    return await $fetch(`${baseUrl}/movie/top_rated`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page: 1
      }
    })
  }

  const fetchUpcomingMovies = async (): Promise<MovieListResponse> => {
    return await $fetch(`${baseUrl}/movie/upcoming`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page: 1
      }
    })
  }

  const fetchNowPlayingMovies = async (): Promise<MovieListResponse> => {
    return await $fetch(`${baseUrl}/movie/now_playing`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page: 1
      }
    })
  }

  const fetchPopularTVShows = async (): Promise<MovieListResponse> => {
    return await $fetch(`${baseUrl}/tv/popular`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page: 1
      }
    })
  }

  const fetchTopRatedTVShows = async (): Promise<MovieListResponse> => {
    return await $fetch(`${baseUrl}/tv/top_rated`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page: 1
      }
    })
  }

  const fetchCurrentlyAiringTVShows = async (): Promise<MovieListResponse> => {
    return await $fetch(`${baseUrl}/tv/on_the_air`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page: 1
      }
    })
  }

  const fetchTVShowDetails = async (id: number): Promise<Movie> => {
    return await $fetch(`${baseUrl}/tv/${id}`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        append_to_response: 'videos,credits'
      }
    })
  }

  return {
    fetchPopularMovies,
    fetchMovieDetails,
    fetchTrendingMovies,
    fetchTopRatedMovies,
    fetchUpcomingMovies,
    fetchNowPlayingMovies,
    fetchPopularTVShows,
    fetchTopRatedTVShows,
    fetchCurrentlyAiringTVShows,
    fetchTVShowDetails
  }
}
