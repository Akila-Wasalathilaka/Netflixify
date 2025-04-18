<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <Header />

    <main class="flex-1 container mx-auto px-4 py-8">
      <!-- Featured Movies Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">Featured Movies</h2>
        <div v-if="featuredMoviesPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="featuredMoviesError" class="bg-red-500 text-white p-4 rounded">
          Error loading featured movies: {{ featuredMoviesError.message }}
        </div>
        <div v-else-if="featuredMovies?.results?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          <div 
            v-for="movie in featuredMovies.results" 
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
          No featured movies found
        </div>
      </section>

      <!-- Top Rated Movies Section -->
      <section>
        <h2 class="text-2xl font-semibold mb-5">Top Rated Movies</h2>
        <div v-if="topRatedMoviesPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="topRatedMoviesError" class="bg-red-500 text-white p-4 rounded">
          Error loading top rated movies: {{ topRatedMoviesError.message }}
        </div>
        <div v-else-if="topRatedMovies?.results?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          <div 
            v-for="movie in topRatedMovies.results" 
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
          No top-rated movies found
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
// Fetch the required data from composables
const { fetchPopularMovies, fetchTopRatedMovies, fetchTrendingMovies } = useTmdb()

// Fetch featured movies (can be a custom category or any popular movies)
const { data: featuredMovies, pending: featuredMoviesPending, error: featuredMoviesError } = await useAsyncData('featuredMovies', () => fetchPopularMovies())

// Fetch top-rated movies
const { data: topRatedMovies, pending: topRatedMoviesPending, error: topRatedMoviesError } = await useAsyncData('topRatedMovies', () => fetchTopRatedMovies())

// Optionally, if you want to add another custom category, fetch trending movies
const { data: trendingMovies, pending: trendingPending, error: trendingError } = await useAsyncData('trendingMovies', () => fetchTrendingMovies())
</script>

<style scoped>
/* Ensure the container stretches to the full screen height and takes space under the header */
main {
  min-height: calc(100vh - 4rem); /* Subtracting the header height */
}

.container {
  max-width: 1200px;
}

@media (max-width: 1024px) {
  .container {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
