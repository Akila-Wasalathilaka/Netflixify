<template>
  <footer class="bg-gray-900 border-t border-gray-800">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <!-- Main Content Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <!-- Brand Column - Full width on smallest screens -->
        <div class="space-y-4 md:space-y-6 col-span-2 sm:col-span-2 md:col-span-1">
          <NuxtLink to="/" class="inline-block">
            <span class="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">
              Neflixify
            </span>
          </NuxtLink>
          <p class="text-gray-400 text-sm leading-relaxed">
            Curated content for the modern viewer
          </p>
          <div class="flex items-center space-x-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name" 
              :href="social.url" 
              class="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <span class="sr-only">{{ social.name }}</span>
              <component :is="social.icon" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="col-span-1">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-3 md:mb-4">Explore</h3>
          <ul class="space-y-2 md:space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <NuxtLink 
                :to="link.path" 
                class="text-gray-400 hover:text-white text-xs md:text-sm flex items-center group"
              >
                <ArrowRightIcon class="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <span class="group-hover:translate-x-1 transition-transform duration-200">
                  {{ link.name }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div class="col-span-1">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-3 md:mb-4">Genres</h3>
          <div class="grid grid-cols-1 gap-2 md:gap-3">
            <NuxtLink 
              v-for="genre in popularGenres.slice(0, mobileView ? 3 : popularGenres.length)" 
              :key="genre.id" 
              :to="`/genre/${genre.id}`"
              class="text-gray-400 hover:text-white text-xs transition-colors duration-200"
            >
              {{ genre.name }}
            </NuxtLink>
            <button 
              v-if="mobileView && popularGenres.length > 3" 
              @click="showAllGenres = !showAllGenres"
              class="text-blue-400 text-xs mt-1"
            >
              {{ showAllGenres ? 'Show less' : 'Show more' }}
            </button>
          </div>
          <!-- Expanded genres for mobile -->
          <div v-if="mobileView && showAllGenres" class="grid grid-cols-1 gap-2 mt-2">
            <NuxtLink 
              v-for="genre in popularGenres.slice(3)" 
              :key="genre.id" 
              :to="`/genre/${genre.id}`"
              class="text-gray-400 hover:text-white text-xs transition-colors duration-200"
            >
              {{ genre.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- Newsletter - Full width on mobile -->
        <div class="col-span-2 sm:col-span-2 md:col-span-1 mt-6 md:mt-0">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-3 md:mb-4">Updates</h3>
          <form @submit.prevent="subscribe" class="space-y-2 md:space-y-3">
            <input
              v-model="email"
              type="email"
              required
              placeholder="Email address"
              class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-500 text-xs md:text-sm"
            />
            <button
              type="submit"
              class="w-full bg-gray-800 hover:bg-gray-700 text-white text-xs md:text-sm py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <span>Subscribe</span>
              <ArrowRightIcon class="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
            </button>
          </form>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-800 my-6 md:my-8"></div>

      <!-- Bottom Footer -->
      <div class="flex flex-col sm:flex-row justify-between items-center text-gray-400">
        <p class="text-xs">
          &copy; {{ new Date().getFullYear() }} Neflixify
        </p>
        <div class="flex space-x-6 mt-4 sm:mt-0">
          <NuxtLink to="/privacy" class="text-xs hover:text-white transition-colors duration-200">
            Privacy
          </NuxtLink>
          <NuxtLink to="/terms" class="text-xs hover:text-white transition-colors duration-200">
            Terms
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <div 
      v-if="showToast" 
      class="fixed bottom-4 right-4 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg flex items-center text-xs md:text-sm backdrop-blur-sm"
    >
      <CheckCircleIcon class="w-4 h-4 mr-2" />
      {{ toastMessage }}
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

import {
  Globe,
  Twitter,
  Film
} from 'lucide-vue-next'

const socialLinks = [
  { name: 'Website', url: '#', icon: Globe },
  { name: 'Twitter', url: '#', icon: Twitter },
  { name: 'Movies', url: '#', icon: Film }
]

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Movies', path: '/movies' },
  { name: 'TV Shows', path: '/tv-shows' },
  { name: 'Top Rated', path: '/top-rated' }
]

const popularGenres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 878, name: 'Sci-Fi' },
  { id: 14, name: 'Fantasy' }
]

const email = ref('')
const showToast = ref(false)
const toastMessage = ref('')
const windowWidth = ref(window.innerWidth)
const showAllGenres = ref(false)

// Handle responsive behavior
const mobileView = computed(() => windowWidth.value < 640)

const handleResize = () => {
  windowWidth.value = window.innerWidth
  // Reset showAllGenres when switching to desktop
  if (windowWidth.value >= 640) {
    showAllGenres.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const subscribe = () => {
  toastMessage.value = 'Subscription confirmed'
  showToast.value = true
  email.value = ''
  setTimeout(() => showToast.value = false, 2000)
}
</script>