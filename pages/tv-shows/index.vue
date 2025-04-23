<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <Header />

    <main class="flex-1 container mx-auto px-4 py-8">
      <!-- Featured TV Shows -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-6 text-center">Featured TV Shows</h2>
        <div v-if="featuredTVPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="featuredTVError" class="bg-red-500 text-white p-4 rounded mx-auto max-w-2xl">
          Error loading featured TV shows: {{ featuredTVError.message }}
        </div>
        <div v-else-if="featuredTV?.results?.length" class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
          <div 
            v-for="tv in featuredTV.results" 
            :key="tv.id" 
            class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-[200px]"
          >
            <NuxtLink :to="`/tv-shows/${tv.id}`" class="block group">
              <div class="aspect-w-2 aspect-h-3 overflow-hidden">
                <img 
                  :src="tv.poster_path ? `https://image.tmdb.org/t/p/w342${tv.poster_path}` : 'https://via.placeholder.com/342x513'" 
                  :alt="tv.name"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="p-2">
                <h3 class="font-bold text-sm mb-1 truncate">{{ tv.name }}</h3>
                <div class="flex items-center justify-between">
                  <span class="text-yellow-400 text-xs">
                    {{ (tv.vote_average || 0).toFixed(1) }}/10
                  </span>
                  <span class="text-gray-400 text-[0.625rem]">
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
        <h2 class="text-2xl font-semibold mb-5 text-center">Top Rated TV Shows</h2>
        <div v-if="topRatedTVPending" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div v-else-if="topRatedTVError" class="bg-red-500 text-white p-4 rounded mx-auto max-w-2xl">
          Error loading top-rated TV shows: {{ topRatedTVError.message }}
        </div>
        <div v-else-if="topRatedTV?.results?.length" class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
          <div 
            v-for="tv in topRatedTV.results" 
            :key="tv.id" 
            class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-[200px]"
          >
            <NuxtLink :to="`/tv-shows/${tv.id}`" class="block group">
              <div class="aspect-w-2 aspect-h-3 overflow-hidden">
                <img 
                  :src="tv.poster_path ? `https://image.tmdb.org/t/p/w342${tv.poster_path}` : 'https://via.placeholder.com/342x513'" 
                  :alt="tv.name"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="p-2">
                <h3 class="font-bold text-sm mb-1 truncate">{{ tv.name }}</h3>
                <div class="flex items-center justify-between">
                  <span class="text-yellow-400 text-xs">
                    {{ (tv.vote_average || 0).toFixed(1) }}/10
                  </span>
                  <span class="text-gray-400 text-[0.625rem]">
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