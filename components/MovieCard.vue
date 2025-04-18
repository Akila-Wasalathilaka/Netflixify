<template>
  <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
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
</template>

<script setup lang="ts">
defineProps<{
  movie: {
    id: number,
    title: string,
    poster_path: string | null,
    vote_average: number,
    release_date: string
  }
}>()
</script>
