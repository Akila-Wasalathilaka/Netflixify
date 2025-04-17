<template>
  <footer class="bg-black text-gray-300 border-t border-gray-800">
    <div class="container mx-auto px-4 py-12">
      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand Column -->
        <div class="space-y-6">
          <div class="flex items-center">
            <div class="relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-75"></div>
              <span class="relative text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300">
                Neflixify
              </span>
            </div>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            The next generation streaming experience. Curated content for the future.
          </p>
          <div class="flex space-x-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name" 
              :href="social.url" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              <span class="sr-only">{{ social.name }}</span>
              <component :is="social.icon" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-200 mb-4">Navigation</h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <NuxtLink 
                :to="link.path" 
                class="text-gray-400 hover:text-white text-sm transition-all duration-300 flex items-center group"
              >
                <span class="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-200 mb-4">Categories</h3>
          <div class="grid grid-cols-2 gap-3">
            <NuxtLink 
              v-for="genre in popularGenres" 
              :key="genre.id" 
              :to="`/genre/${genre.id}`"
              class="text-gray-400 hover:text-white text-xs transition-all duration-300 hover:translate-x-1"
            >
              {{ genre.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-200 mb-4">Stay Updated</h3>
          <p class="text-gray-400 text-xs mb-4">
            Subscribe for exclusive content and updates
          </p>
          <form @submit.prevent="subscribe" class="space-y-3">
            <div class="relative">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="your@email.com"
                class="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 text-white placeholder-gray-500 text-sm"
              />
              <div class="absolute inset-0 rounded-lg border border-transparent group-hover:border-blue-400/50 transition-all duration-300 pointer-events-none"></div>
            </div>
            <button
              type="submit"
              class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm flex items-center justify-center"
            >
              <span>Subscribe</span>
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-800 my-8"></div>

      <!-- Bottom Footer -->
      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-500 text-xs">
          &copy; {{ new Date().getFullYear() }} Neflixify. All rights reserved.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <NuxtLink to="/privacy" class="text-gray-500 hover:text-white text-xs transition-all duration-300">
            Privacy
          </NuxtLink>
          <NuxtLink to="/terms" class="text-gray-500 hover:text-white text-xs transition-all duration-300">
            Terms
          </NuxtLink>
          <NuxtLink to="/contact" class="text-gray-500 hover:text-white text-xs transition-all duration-300">
            Contact
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <div 
      v-if="showToast" 
      class="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-xl flex items-center animate-fade-in-up text-sm"
    >
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      {{ toastMessage }}
      <button @click="showToast = false" class="ml-3 opacity-70 hover:opacity-100">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Social Icons
const FacebookIcon = {
  template: `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>`
}

const TwitterIcon = {
  template: `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>`
}

const InstagramIcon = {
  template: `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`
}

const socialLinks = [
  { name: 'Facebook', url: 'https://facebook.com', icon: FacebookIcon },
  { name: 'Twitter', url: 'https://twitter.com', icon: TwitterIcon },
  { name: 'Instagram', url: 'https://instagram.com', icon: InstagramIcon }
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
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 878, name: 'Sci-Fi' },
  { id: 14, name: 'Fantasy' }
]

const email = ref('')
const showToast = ref(false)
const toastMessage = ref('')

const subscribe = () => {
  console.log('Subscribed with email:', email.value)
  toastMessage.value = 'Subscription confirmed'
  showToast.value = true
  email.value = ''
  
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}
</script>

<style>
/* Animation for the toast */
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Glow effect for brand name */
.glow-text {
  text-shadow: 0 0 8px rgba(165, 180, 252, 0.6);
}
</style>