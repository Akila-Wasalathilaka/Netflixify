<template>
  <div class="relative">
    <Swiper
      :modules="[Autoplay, EffectCreative]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false
      }"
      effect="creative"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      }"
      class="h-[500px] w-full rounded-lg"
    >
      <SwiperSlide v-for="movie in movies" :key="movie.id">
        <NuxtLink :to="`/movies/${movie.id}`" class="block h-full w-full relative">
          <img 
            :src="movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : 'https://via.placeholder.com/1920x1080'"
            :alt="movie.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-8">
            <h2 class="text-3xl font-bold mb-2">{{ movie.title }}</h2>
            <p class="text-lg line-clamp-2 max-w-2xl">{{ movie.overview }}</p>
            <div class="mt-4 flex items-center gap-4">
              <span class="flex items-center text-yellow-400">
                ⭐ {{ movie.vote_average.toFixed(1) }}
              </span>
              <span class="text-gray-300">
                {{ new Date(movie.release_date).getFullYear() }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectCreative } from 'swiper/modules'

defineProps<{
  movies: Array<{
    id: number
    title: string
    backdrop_path: string | null
    overview: string
    vote_average: number
    release_date: string
  }>
}>()
</script>
