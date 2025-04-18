<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <Header />

    <main class="flex-1 container mx-auto px-4 py-8">
      <div v-if="pending" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <div v-else-if="error" class="bg-red-500 text-white p-4 rounded">
        Error loading movie: {{ error.message }}
      </div>

      <div v-else>
        <NuxtLink
          to="/"
          class="inline-block mb-6 text-blue-400 hover:underline text-sm font-semibold"
        >
          ← Back to Movies
        </NuxtLink>

        <div class="flex flex-col md:flex-row gap-8">
          <div class="w-full md:w-1/3 lg:w-1/4">
            <img
              :src="movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'"
              :alt="movie?.title || 'Movie poster'"
              class="w-full rounded-lg shadow-lg"
            >
          </div>

          <div class="w-full md:w-2/3 lg:w-3/4">
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

            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="genre in movie?.genres || []"
                :key="genre.id"
                class="bg-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {{ genre.name }}
              </span>
            </div>

            <h2 class="text-xl font-semibold mb-2">Overview</h2>
            <p v-if="movie?.overview" class="text-gray-300 mb-6">{{ movie.overview }}</p>

            <div v-if="movie?.videos?.results?.length" class="mb-8">
              <h2 class="text-xl font-semibold mb-4">Trailer</h2>
              <div class="aspect-w-16 aspect-h-9">
                <iframe
                  class="w-full h-64 md:h-96 rounded-lg"
                  :src="`https://www.youtube.com/embed/${movie.videos.results[0].key}`"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
            </div>

            <div v-if="movie?.credits?.cast?.length" class="mb-8">
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
            </div>
          </div>
        </div>
      </div>
    </main>

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
