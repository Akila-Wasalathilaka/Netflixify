<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <Header />

    <main class="flex-1 container mx-auto px-4 py-8">
      <!-- Featured TV Shows -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6">Featured TV Shows</h2>
        <div v-if="featuredTVPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="featuredTVError" class="bg-red-500 text-white p-4 rounded">
          Error loading featured TV shows: {{ featuredTVError.message }}
        </div>
        <div
          v-else-if="featuredTV?.results?.length"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6"
        >
          <div
            v-for="tv in featuredTV.results"
            :key="tv.id"
            class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <NuxtLink :to="`/tv/${tv.id}`">
              <img
                :src="tv.poster_path ? `https://image.tmdb.org/t/p/w500${tv.poster_path}` : 'https://via.placeholder.com/500x750'"
                :alt="tv.name"
                class="w-full h-64 object-cover"
              />
              <div class="p-4">
                <h3 class="font-bold text-lg mb-2 truncate">{{ tv.name }}</h3>
                <div class="flex items-center justify-between">
                  <span class="text-yellow-400">
                    {{ (tv.vote_average || 0).toFixed(1) }}/10
                  </span>
                  <span class="text-gray-400 text-sm">
                    {{ tv.first_air_date ? new Date(tv.first_air_date).getFullYear() : 'N/A' }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
        <div v-else class="text-center py-12 text-gray-400">
          No featured TV shows found
        </div>
      </section>

      <!-- Top Rated TV Shows -->
      <section>
        <h2 class="text-2xl font-semibold mb-5">Top Rated TV Shows</h2>
        <div v-if="topRatedTVPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="topRatedTVError" class="bg-red-500 text-white p-4 rounded">
          Error loading top-rated TV shows: {{ topRatedTVError.message }}
        </div>
        <div
          v-else-if="topRatedTV?.results?.length"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6"
        >
          <div
            v-for="tv in topRatedTV.results"
            :key="tv.id"
            class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <NuxtLink :to="`/tv/${tv.id}`">
              <img
                :src="tv.poster_path ? `https://image.tmdb.org/t/p/w500${tv.poster_path}` : 'https://via.placeholder.com/500x750'"
                :alt="tv.name"
                class="w-full h-64 object-cover"
              />
              <div class="p-4">
                <h3 class="font-bold text-lg mb-2 truncate">{{ tv.name }}</h3>
                <div class="flex items-center justify-between">
                  <span class="text-yellow-400">
                    {{ (tv.vote_average || 0).toFixed(1) }}/10
                  </span>
                  <span class="text-gray-400 text-sm">
                    {{ tv.first_air_date ? new Date(tv.first_air_date).getFullYear() : 'N/A' }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
        <div v-else class="text-center py-12 text-gray-400">
          No top-rated TV shows found
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
const { fetchPopularTVShows, fetchTopRatedTVShows } = useTmdb()

const { data: featuredTV, pending: featuredTVPending, error: featuredTVError } = await useAsyncData(
  'featuredTV',
  () => fetchPopularTVShows()
)

const { data: topRatedTV, pending: topRatedTVPending, error: topRatedTVError } = await useAsyncData(
  'topRatedTV',
  () => fetchTopRatedTVShows()
)
</script>

<style scoped>
main {
  min-height: calc(100vh - 4rem);
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
