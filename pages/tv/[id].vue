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
        Error loading TV Show: {{ error.message }}
      </div>

      <!-- TV Show Details -->
      <div v-else>
        <!-- Back Button with Pill Design and Hover Animation -->
        <NuxtLink
          to="/tv-shows"
          class="inline-flex items-center gap-2 mb-6 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out hover:bg-blue-500 hover:scale-105"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to TV Shows
        </NuxtLink>

        <!-- TV Show Content Layout -->
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Poster Section -->
          <div class="w-full md:w-1/3 lg:w-1/4">
            <img
              :src="tvShow?.poster_path ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` : 'https://via.placeholder.com/500x750'"
              :alt="tvShow?.name || 'TV Show poster'"
              class="w-full rounded-lg shadow-lg"
            >
          </div>

          <!-- TV Show Details Section -->
          <div class="w-full md:w-2/3 lg:w-3/4">
            <!-- Title and Metadata -->
            <h1 v-if="tvShow" class="text-3xl font-bold mb-2">{{ tvShow.name }}</h1>
            <div class="flex items-center gap-4 mb-4">
              <span class="bg-blue-600 px-2 py-1 rounded text-sm">
                {{ tvShow?.first_air_date?.split('-')[0] }}
              </span>
              <span class="text-yellow-400">
                ★ {{ tvShow?.vote_average?.toFixed(1) }} ({{ tvShow?.vote_count || 0 }} votes)
              </span>
              <span class="text-gray-400">
                {{ tvShow?.number_of_seasons || 0 }} Season{{ tvShow?.number_of_seasons !== 1 ? 's' : '' }}
              </span>
            </div>

            <!-- Genres -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="genre in tvShow?.genres || []"
                :key="genre.id"
                class="bg-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {{ genre.name }}
              </span>
            </div>

            <!-- Overview -->
            <section>
              <h2 class="text-xl font-semibold mb-2">Overview</h2>
              <p v-if="tvShow?.overview" class="text-gray-300 mb-6">{{ tvShow.overview }}</p>
            </section>

            <!-- Seasons -->
            <section v-if="tvShow?.seasons?.length" class="mb-8">
              <h2 class="text-xl font-semibold mb-4">Seasons</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div
                  v-for="season in tvShow.seasons"
                  :key="season.id"
                  class="bg-gray-800 p-4 rounded-lg shadow-lg"
                >
                  <img
                    :src="season.poster_path ? `https://image.tmdb.org/t/p/w200${season.poster_path}` : 'https://via.placeholder.com/200x300'"
                    :alt="season.name"
                    class="w-full h-48 object-cover rounded-lg mb-3"
                  >
                  <h3 class="text-lg font-medium">{{ season.name }}</h3>
                  <p class="text-gray-400 text-sm mb-2">
                    {{ season.air_date ? season.air_date.split('-')[0] : 'TBA' }} • {{ season.episode_count }} Episode{{ season.episode_count !== 1 ? 's' : '' }}
                  </p>
                  <p v-if="season.overview" class="text-gray-300 text-sm line-clamp-3">{{ season.overview }}</p>
                  <p v-else class="text-gray-300 text-sm italic">No overview available.</p>
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
const id = parseInt(route.params.id as string, 10)

const { fetchTVShowDetails } = useTmdb()

const { data: tvShow, pending, error } = await useAsyncData(
  `tv-${id}`,
  () => fetchTVShowDetails(id)
)

useHead({
  title: tvShow.value?.name || 'TV Show Details',
  meta: [
    { name: 'description', content: tvShow.value?.overview || '' },
    { property: 'og:title', content: tvShow.value?.name || '' },
    { property: 'og:description', content: tvShow.value?.overview || '' },
    { property: 'og:image', content: tvShow.value?.poster_path ? `https://image.tmdb.org/t/p/w500${tvShow.value.poster_path}` : '' },
  ]
})
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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>