<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <Header />

    <main class="container mx-auto px-4 py-8">
      <!-- Top Rated Movies -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">Top Rated Movies</h2>
        <div v-if="moviesPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="moviesError" class="bg-red-500 text-white p-4 rounded">
          Error loading top rated movies: {{ moviesError.message }}
        </div>
        <div v-else-if="topRatedMovies?.results?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <MovieCard v-for="movie in topRatedMovies.results" :key="movie.id" :movie="movie" />
        </div>
        <div v-else class="text-center py-12 text-gray-400">
          No top rated movies found
        </div>
      </section>

      <!-- Top Rated TV Shows -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Top Rated TV Shows</h2>
        <div v-if="tvPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="tvError" class="bg-red-500 text-white p-4 rounded">
          Error loading top rated TV shows: {{ tvError.message }}
        </div>
        <div v-else-if="topRatedTV?.results?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <MovieCard v-for="show in topRatedTV.results" :key="show.id" :movie="show" />
        </div>
        <div v-else class="text-center py-12 text-gray-400">
          No top rated TV shows found
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
const { fetchTopRatedMovies, fetchTopRatedTVShows } = useTmdb()

const { data: topRatedMovies, pending: moviesPending, error: moviesError } = await useAsyncData('topRatedMovies', () => fetchTopRatedMovies())
const { data: topRatedTV, pending: tvPending, error: tvError } = await useAsyncData('topRatedTVShows', () => fetchTopRatedTVShows())
</script>
