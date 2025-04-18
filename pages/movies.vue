<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <Header />

    <main class="container mx-auto px-4 py-8">
      <!-- Top Rated Movies Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">Top Rated</h2>
        <div v-if="topRatedPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="topRatedError" class="bg-red-500 text-white p-4 rounded">
          Error loading top rated movies: {{ topRatedError.message }}
        </div>
        <div v-else-if="topRated?.results?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <MovieCard v-for="movie in topRated.results" :key="movie.id" :movie="movie" />
        </div>
        <div v-else class="text-center py-12 text-gray-400">
          No top rated movies found
        </div>
      </section>

      <!-- Upcoming Movies Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">Upcoming</h2>
        <div v-if="upcomingPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="upcomingError" class="bg-red-500 text-white p-4 rounded">
          Error loading upcoming movies: {{ upcomingError.message }}
        </div>
        <div v-else-if="upcoming?.results?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <MovieCard v-for="movie in upcoming.results" :key="movie.id" :movie="movie" />
        </div>
        <div v-else class="text-center py-12 text-gray-400">
          No upcoming movies found
        </div>
      </section>

      <!-- Now Playing Section -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Now Playing</h2>
        <div v-if="nowPlayingPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="nowPlayingError" class="bg-red-500 text-white p-4 rounded">
          Error loading now playing movies: {{ nowPlayingError.message }}
        </div>
        <div v-else-if="nowPlaying?.results?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <MovieCard v-for="movie in nowPlaying.results" :key="movie.id" :movie="movie" />
        </div>
        <div v-else class="text-center py-12 text-gray-400">
          No movies currently playing
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
const { fetchTopRatedMovies, fetchUpcomingMovies, fetchNowPlayingMovies } = useTmdb()

const { data: topRated, pending: topRatedPending, error: topRatedError } = await useAsyncData('topRated', () => fetchTopRatedMovies())
const { data: upcoming, pending: upcomingPending, error: upcomingError } = await useAsyncData('upcoming', () => fetchUpcomingMovies())
const { data: nowPlaying, pending: nowPlayingPending, error: nowPlayingError } = await useAsyncData('nowPlaying', () => fetchNowPlayingMovies())
</script>
