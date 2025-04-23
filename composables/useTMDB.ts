import type { Movie, MovieListResponse } from '~/types/movie'
import type { Genre, GenreListResponse } from '~/types/genre'

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

  // New functions for genre-related features
  
  // Fetch all movie genres
  const fetchMovieGenres = async (): Promise<GenreListResponse> => {
    return await $fetch(`${baseUrl}/genre/movie/list`, {
      params: {
        api_key: apiKey,
        language: 'en-US'
      }
    })
  }
  
  // Fetch all TV genres
  const fetchTVGenres = async (): Promise<GenreListResponse> => {
    return await $fetch(`${baseUrl}/genre/tv/list`, {
      params: {
        api_key: apiKey,
        language: 'en-US'
      }
    })
  }
  
  // Fetch all genres (combines movie and TV genres)
  const fetchAllGenres = async (): Promise<Genre[]> => {
    try {
      const [movieGenres, tvGenres] = await Promise.all([
        fetchMovieGenres(),
        fetchTVGenres()
      ])
      
      // Combine genres and remove duplicates
      const allGenres: Genre[] = [...movieGenres.genres]
      tvGenres.genres.forEach(tvGenre => {
        if (!allGenres.some(genre => genre.id === tvGenre.id)) {
          allGenres.push(tvGenre)
        }
      })
      
      return allGenres
    } catch (error) {
      console.error('Error fetching genres:', error)
      return []
    }
  }
  
  // Fetch movies by genre ID
  const fetchMoviesByGenre = async (genreId: number, page: number = 1): Promise<MovieListResponse> => {
    return await $fetch(`${baseUrl}/discover/movie`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        with_genres: genreId,
        page
      }
    })
  }
  
  // Fetch TV shows by genre ID
  const fetchTVShowsByGenre = async (genreId: number, page: number = 1): Promise<MovieListResponse> => {
    return await $fetch(`${baseUrl}/discover/tv`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        with_genres: genreId,
        page
      }
    })
  }
  
  // Fetch both movies and TV shows by genre ID
  const fetchContentByGenre = async (genreId: number, page: number = 1): Promise<{
    movies: MovieListResponse,
    tvShows: MovieListResponse,
    totalPages: number
  }> => {
    try {
      const [movies, tvShows] = await Promise.all([
        fetchMoviesByGenre(genreId, page),
        fetchTVShowsByGenre(genreId, page)
      ])
      
      return {
        movies,
        tvShows,
        totalPages: Math.max(movies.total_pages, tvShows.total_pages)
      }
    } catch (error) {
      console.error(`Error fetching content for genre ${genreId}:`, error)
      throw error
    }
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
    fetchTVShowDetails,
    // New genre-related functions
    fetchMovieGenres,
    fetchTVGenres,
    fetchAllGenres,
    fetchMoviesByGenre,
    fetchTVShowsByGenre,
    fetchContentByGenre
  }
}