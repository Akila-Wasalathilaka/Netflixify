<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <Header />

    <main class="flex-1 container mx-auto px-4 py-8">
      <!-- Featured Movies Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6 text-center">Featured Movies</h2>
        <div v-if="featuredMoviesPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="featuredMoviesError" class="bg-red-500 text-white p-4 rounded mx-auto max-w-2xl">
          Error loading featured movies: {{ featuredMoviesError.message }}
        </div>
        <div v-else-if="featuredMovies?.results?.length" class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 justify-items-center">
          <div 
            v-for="movie in featuredMovies.results" 
            :key="movie.id" 
            class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-[200px]"
          >
            <NuxtLink :to="`/movies/${movie.id}`" class="block group">
              <div class="aspect-w-2 aspect-h-3 overflow-hidden">
                <img 
                  :src="movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : 'https://via.placeholder.com/342x513'" 
                  :alt="movie.title"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="p-2">
                <h3 class="font-bold text-sm mb-1 truncate">{{ movie.title }}</h3>
                <div class="flex items-center justify-between">
                  <span class="text-yellow-400 text-xs">
                    {{ (movie.vote_average || 0).toFixed(1) }}/10
                  </span>
                  <span class="text-gray-400 text-[0.625rem]">
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
        <h2 class="text-2xl font-semibold mb-5 text-center">Top Rated Movies</h2>
        <div v-if="topRatedMoviesPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="topRatedMoviesError" class="bg-red-500 text-white p-4 rounded mx-auto max-w-2xl">
          Error loading top rated movies: {{ topRatedMoviesError.message }}
        </div>
        <div v-else-if="topRatedMovies?.results?.length" class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
          <div 
            v-for="movie in topRatedMovies.results" 
            :key="movie.id" 
            class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-[200px]"
          >
            <NuxtLink :to="`/movies/${movie.id}`" class="block group">
              <div class="aspect-w-2 aspect-h-3 overflow-hidden">
                <img 
                  :src="movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : 'https://via.placeholder.com/342x513'" 
                  :alt="movie.title"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="p-2">
                <h3 class="font-bold text-sm mb-1 truncate">{{ movie.title }}</h3>
                <div class="flex items-center justify-between">
                  <span class="text-yellow-400 text-xs">
                    {{ (movie.vote_average || 0).toFixed(1) }}/10
                  </span>
                  <span class="text-gray-400 text-[0.625rem]">
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
const { fetchPopularMovies, fetchTopRatedMovies, fetchTrendingMovies } = useTmdb()

const { data: featuredMovies, pending: featuredMoviesPending, error: featuredMoviesError } = await useAsyncData('featuredMovies', () => fetchPopularMovies())

const { data: topRatedMovies, pending: topRatedMoviesPending, error: topRatedMoviesError } = await useAsyncData('topRatedMovies', () => fetchTopRatedMovies())

const { data: trendingMovies, pending: trendingPending, error: trendingError } = await useAsyncData('trendingMovies', () => fetchTrendingMovies())
</script>

<style scoped>
main {
  min-height: calc(100vh - 4rem);
}

.container {
  max-width: 1200px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

/* Ensure images scale properly */
img {
  max-width: 100%;
  height: auto;
}

/* Center the grid container */
.grid {
  display: grid;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}

/* Custom breakpoint for extra small screens */
@media (max-width: 479px) {
  .container {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  .p-2 {
    padding: 0.375rem;
  }

  .text-sm {
    font-size: 0.75rem;
  }

  .text-xs {
    font-size: 0.625rem;
  }

  .text-[0.625rem] {
    font-size: 0.5rem;
  }

  .max-w-[200px] {
    max-width: 150px;
  }
}

/* Adjustments for small screens */
@media (min-width: 480px) and (max-width: 639px) {
  .container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .max-w-[200px] {
    max-width: 160px;
  }
}

/* Adjustments for medium screens */
@media (min-width: 640px) and (max-width: 767px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .max-w-[200px] {
    max-width: 180px;
  }
}

/* Adjustments for large screens */
@media (min-width: 1024px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>