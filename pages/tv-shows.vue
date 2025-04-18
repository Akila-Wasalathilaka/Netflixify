<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <Header />

    <main class="container mx-auto px-4 py-8">
      <!-- Popular TV Shows -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">Popular TV Shows</h2>
        <div v-if="popularPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="popularError" class="bg-red-500 text-white p-4 rounded">
          Error loading popular TV shows: {{ popularError.message }}
        </div>
        <div v-else-if="popular?.results?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <MovieCard v-for="show in popular.results" :key="show.id" :movie="show" />
        </div>
        <div v-else class="text-center py-12 text-gray-400">
          No popular TV shows found
        </div>
      </section>

      <!-- Top Rated TV Shows -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">Top Rated TV Shows</h2>
        <div v-if="topRatedPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="topRatedError" class="bg-red-500 text-white p-4 rounded">
          Error loading top rated TV shows: {{ topRatedError.message }}
        </div>
        <div v-else-if="topRated?.results?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <MovieCard v-for="show in topRated.results" :key="show.id" :movie="show" />
        </div>
        <div v-else class="text-center py-12 text-gray-400">
          No top rated TV shows found
        </div>
      </section>

      <!-- Currently Airing -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Currently Airing</h2>
        <div v-if="airingPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="airingError" class="bg-red-500 text-white p-4 rounded">
          Error loading currently airing shows: {{ airingError.message }}
        </div>
        <div v-else-if="airing?.results?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <MovieCard v-for="show in airing.results" :key="show.id" :movie="show" />
        </div>
        <div v-else class="text-center py-12 text-gray-400">
          No currently airing shows found
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
const {
  fetchPopularTVShows,
  fetchTopRatedTVShows,
  fetchCurrentlyAiringTVShows
} = useTmdb()

const { data: popular, pending: popularPending, error: popularError } = await useAsyncData('popularTV', () => fetchPopularTVShows())
const { data: topRated, pending: topRatedPending, error: topRatedError } = await useAsyncData('topRatedTV', () => fetchTopRatedTVShows())
const { data: airing, pending: airingPending, error: airingError } = await useAsyncData('airingTV', () => fetchCurrentlyAiringTVShows())
</script>
