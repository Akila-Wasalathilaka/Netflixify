<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <Header />

    <main class="flex-1 container mx-auto px-4 py-8">
      <!-- Trending Movies Carousel Section (with Swiper) -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">Trending Now</h2>
        <div v-if="trendingPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="trendingError" class="bg-red-500 text-white p-4 rounded">
          Error loading trending movies: {{ trendingError.message }}
        </div>
        <TrendingMoviesCarousel 
          v-else-if="trendingMovies?.results?.length" 
          :movies="trendingMovies.results.map(movie => ({ ...movie, overview: movie.overview || '' }))"
        />
      </section>

      <!-- Popular Movies Row (Manual Swipe with Arrows) -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">Popular Movies</h2>
        <div v-if="popularPending" class="flex justify-center items-center h-48">
          <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="popularError" class="bg-red-500 text-white p-4 rounded">
          Error loading popular movies: {{ popularError.message }}
        </div>
        <div v-else-if="popularMovies?.results?.length" class="relative">
          <button 
            @click="scrollLeft('popular')" 
            class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full hover:bg-gray-700 z-10"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div 
            ref="popularScroll" 
            class="flex space-x-6 overflow-x-hidden"
          >
            <div 
              v-for="movie in popularMovies.results" 
              :key="movie.id" 
              class="flex-shrink-0 w-56 transition-transform duration-500 ease-in-out"
            >
              <img 
                :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`" 
                :alt="movie.title" 
                class="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <p class="mt-3 text-base truncate">{{ movie.title }}</p>
            </div>
          </div>
          <button 
            @click="scrollRight('popular')" 
            class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full hover:bg-gray-700 z-10"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      <!-- Top Rated Movies Row (Manual Swipe with Arrows) -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">Top Rated</h2>
        <div v-if="topRatedPending" class="flex justify-center items-center h-48">
          <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="topRatedError" class="bg-red-500 text-white p-4 rounded">
          Error loading top rated movies: {{ topRatedError.message }}
        </div>
        <div v-else-if="topRatedMovies?.results?.length" class="relative">
          <button 
            @click="scrollLeft('topRated')" 
            class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full hover:bg-gray-700 z-10"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div 
            ref="topRatedScroll" 
            class="flex space-x-6 overflow-x-hidden"
          >
            <div 
              v-for="movie in topRatedMovies.results" 
              :key="movie.id" 
              class="flex-shrink-0 w-56 transition-transform duration-500 ease-in-out"
            >
              <img 
                :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`" 
                :alt="movie.title" 
                class="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <p class="mt-3 text-base truncate">{{ movie.title }}</p>
            </div>
          </div>
          <button 
            @click="scrollRight('topRated')" 
            class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full hover:bg-gray-700 z-10"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      <!-- Upcoming Movies Row (Manual Swipe with Arrows) -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">Upcoming</h2>
        <div v-if="upcomingPending" class="flex justify-center items-center h-48">
          <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="upcomingError" class="bg-red-500 text-white p-4 rounded">
          Error loading upcoming movies: {{ upcomingError.message }}
        </div>
        <div v-else-if="upcomingMovies?.results?.length" class="relative">
          <button 
            @click="scrollLeft('upcoming')" 
            class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full hover:bg-gray-700 z-10"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div 
            ref="upcomingScroll" 
            class="flex space-x-6 overflow-x-hidden"
          >
            <div 
              v-for="movie in upcomingMovies.results" 
              :key="movie.id" 
              class="flex-shrink-0 w-56 transition-transform duration-500 ease-in-out"
            >
              <img 
                :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`" 
                :alt="movie.title" 
                class="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <p class="mt-3 text-base truncate">{{ movie.title }}</p>
            </div>
          </div>
          <button 
            @click="scrollRight('upcoming')" 
            class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full hover:bg-gray-700 z-10"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTmdb } from '~/composables/useTmdb'

const { fetchTrendingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies } = useTmdb()

// Fetch Trending Movies
const { data: trendingMovies, pending: trendingPending, error: trendingError } = await useAsyncData(
  'trendingMovies',
  () => fetchTrendingMovies()
)

// Fetch Popular Movies
const { data: popularMovies, pending: popularPending, error: popularError } = await useAsyncData(
  'popularMovies',
  () => fetchPopularMovies()
)

// Fetch Top Rated Movies
const { data: topRatedMovies, pending: topRatedPending, error: topRatedError } = await useAsyncData(
  'topRatedMovies',
  () => fetchTopRatedMovies()
)

// Fetch Upcoming Movies
const { data: upcomingMovies, pending: upcomingPending, error: upcomingError } = await useAsyncData(
  'upcomingMovies',
  () => fetchUpcomingMovies()
)

// References for scrollable containers
const popularScroll = ref(null)
const topRatedScroll = ref(null)
const upcomingScroll = ref(null)

// Custom smooth scroll function
const smoothScroll = (element, target, duration) => {
  const start = element.scrollLeft
  const startTime = performance.now()

  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeInOutQuad = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2

    element.scrollLeft = start + (target - start) * easeInOutQuad

    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
}

// Scroll functions
const scrollLeft = (section) => {
  const container = section === 'popular' ? popularScroll.value : section === 'topRated' ? topRatedScroll.value : upcomingScroll.value
  if (container) {
    const target = container.scrollLeft - 400
    smoothScroll(container, target, 600) // 600ms duration for smooth animation
  }
}

const scrollRight = (section) => {
  const container = section === 'popular' ? popularScroll.value : section === 'topRated' ? topRatedScroll.value : upcomingScroll.value
  if (container) {
    const target = container.scrollLeft + 400
    smoothScroll(container, target, 600) // 600ms duration for smooth animation
  }
}
</script>

<style scoped>
/* Add subtle hover effect for cards */
div[ref="popularScroll"] > div,
div[ref="topRatedScroll"] > div,
div[ref="upcomingScroll"] > div {
  transition: transform 0.3s ease-in-out;
}

div[ref="popularScroll"] > div:hover,
div[ref="topRatedScroll"] > div:hover,
div[ref="upcomingScroll"] > div:hover {
  transform: scale(1.05);
}
</style>