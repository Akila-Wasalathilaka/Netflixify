<template>
  <footer class="bg-gray-900 border-t border-gray-800">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand Column -->
        <div class="space-y-6">
          <NuxtLink to="/" class="inline-block">
            <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">
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
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">Explore</h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <NuxtLink 
                :to="link.path" 
                class="text-gray-400 hover:text-white text-sm flex items-center group"
              >
                <ArrowRightIcon class="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <span class="group-hover:translate-x-1 transition-transform duration-200">
                  {{ link.name }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">Genres</h3>
          <div class="grid grid-cols-2 gap-3">
            <NuxtLink 
              v-for="genre in popularGenres" 
              :key="genre.id" 
              :to="`/genre/${genre.id}`"
              class="text-gray-400 hover:text-white text-xs transition-colors duration-200"
            >
              {{ genre.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">Updates</h3>
          <form @submit.prevent="subscribe" class="space-y-3">
            <input
              v-model="email"
              type="email"
              required
              placeholder="Email address"
              class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-500 text-sm"
            />
            <button
              type="submit"
              class="w-full bg-gray-800 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <span>Subscribe</span>
              <ArrowRightIcon class="w-4 h-4 ml-2" />
            </button>
          </form>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-800 my-8"></div>

      <!-- Bottom Footer -->
      <div class="flex flex-col md:flex-row justify-between items-center text-gray-400">
        <p class="text-xs">
          &copy; {{ new Date().getFullYear() }} Neflixify
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
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
      class="fixed bottom-4 right-4 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg flex items-center text-sm backdrop-blur-sm"
    >
      <CheckCircleIcon class="w-4 h-4 mr-2" />
      {{ toastMessage }}
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
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

const subscribe = () => {
  toastMessage.value = 'Subscription confirmed'
  showToast.value = true
  email.value = ''
  setTimeout(() => showToast.value = false, 2000)
}
</script>
