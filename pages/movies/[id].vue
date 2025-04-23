<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <!-- Header Section -->
    <Header />

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="pending" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-500 text-white p-4 rounded">
        Error loading movie: {{ error.message }}
      </div>

      <!-- Movie Details -->
      <div v-else>
        <!-- Back Button with Pill Design and Hover Animation -->
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 mb-6 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out hover:bg-blue-500 hover:scale-105"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Movies
        </NuxtLink>

        <!-- Movie Content Layout -->
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Poster Section -->
          <div class="w-full md:w-1/3 lg:w-1/4">
            <img
              :src="movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'"
              :alt="movie?.title || 'Movie poster'"
              class="w-full rounded-lg shadow-lg"
            >
          </div>

          <!-- Movie Details Section -->
          <div class="w-full md:w-2/3 lg:w-3/4">
            <!-- Title and Metadata -->
            <h1 v-if="movie" class="text-3xl font-bold mb-2">{{ movie.title }}</h1>
            <div class="flex items-center gap-4 mb-4">
              <span class="bg-blue-600 px-2 py-1 rounded text-sm">
                {{ movie?.release_date?.split('-')[0] }}
              </span>
              <span class="text-yellow-400">
                ★ {{ movie?.vote_average?.toFixed(1) }} ({{ movie?.vote_count || 0 }} votes)
              </span>
              <span class="text-gray-400">
                {{ movie?.runtime || 'N/A' }} minutes
              </span>
            </div>

            <!-- Genres -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="genre in movie?.genres || []"
                :key="genre.id"
                class="bg-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {{ genre.name }}
              </span>
            </div>

            <!-- Overview -->
            <section>
              <h2 class="text-xl font-semibold mb-2">Overview</h2>
              <p v-if="movie?.overview" class="text-gray-300 mb-6">{{ movie.overview }}</p>
            </section>

            <!-- Trailer -->
            <section v-if="movie?.videos?.results?.length" class="mb-8">
              <h2 class="text-xl font-semibold mb-4">Trailer</h2>
              <div class="aspect-w-16 aspect-h-9">
                <iframe
                  class="w-full h-64 md:h-96 rounded-lg"
                  :src="`https://www.youtube.com/embed/${movie.videos.results[0].key}`"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
            </section>

            <!-- Cast -->
            <section v-if="movie?.credits?.cast?.length" class="mb-8">
              <h2 class="text-xl font-semibold mb-4">Cast</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div
                  v-for="person in movie.credits.cast.slice(0, 6)"
                  :key="person.id"
                  class="text-center"
                >
                  <img
                    :src="person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : 'https://via.placeholder.com/200x300'"
                    :alt="person.name"
                    class="w-full h-32 md:h-48 object-cover rounded-lg mb-2"
                  >
                  <p class="font-medium">{{ person.name }}</p>
                  <p class="text-gray-400 text-sm">{{ person.character }}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer Section -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { fetchMovieDetails } = useTmdb()

const { data: movie, pending, error } = await useAsyncData(
  `movie-${route.params.id}`,
  () => fetchMovieDetails(Number(route.params.id))
)
</script>

<style scoped>
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