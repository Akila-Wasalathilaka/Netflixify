<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <Header />

    <main class="container mx-auto px-4 py-8">
      <!-- Trending Movies Carousel Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">Trending Now</h2>
        <div v-if="trendingPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="trendingError" class="bg-red-500 text-white p-4 rounded">
          Error loading trending movies: {{ trendingError.message }}
        </div>
        <TrendingMoviesCarousel v-else-if="trendingMovies?.results?.length" :movies="trendingMovies.results" />
        <div v-else class="text-center py-12 text-gray-400">
          No trending movies found
        </div>
      </section>

      <!-- Popular Movies Section -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Popular Movies</h2>
        <div v-if="pending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="error" class="bg-red-500 text-white p-4 rounded">
          Error loading movies: {{ error.message }}
        </div>
        <div v-else-if="movies?.results?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div 
            v-for="movie in movies.results" 
            :key="movie.id" 
            class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <NuxtLink :to="`/movies/${movie.id}`">
              <img 
                :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'" 
                :alt="movie.title"
                class="w-full h-64 object-cover"
              />
              <div class="p-4">
                <h3 class="font-bold text-lg mb-2 truncate">{{ movie.title }}</h3>
                <div class="flex items-center justify-between">
                  <span class="text-yellow-400">
                    {{ (movie.vote_average || 0).toFixed(1) }}/10
                  </span>
                  <span class="text-gray-400 text-sm">
                    {{ movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A' }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
        <div v-else class="text-center py-12 text-gray-400">
          No movies found
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectCreative } from 'swiper/modules'

const { fetchPopularMovies, fetchTrendingMovies } = useTmdb()

// Fetch popular movies
const { data: movies, pending, error } = await useAsyncData('popularMovies', () => fetchPopularMovies())

// Fetch trending movies
const { data: trendingMovies, pending: trendingPending, error: trendingError } = await useAsyncData('trendingMovies', () => fetchTrendingMovies())
</script>
