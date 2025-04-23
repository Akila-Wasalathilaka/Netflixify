<template>
  <footer class="bg-gray-900 border-t border-gray-800">
    <div class="max-w-screen-lg mx-auto px-4 py-6 animate-footer-slide">
      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        <!-- Brand Column -->
        <div class="space-y-2 text-center sm:text-left">
          <NuxtLink to="/" class="inline-block">
            <span class="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 animate-gradient">
              Neflixify
            </span>
          </NuxtLink>
          <p class="text-gray-400 text-xs leading-relaxed">
            Discover movies and shows tailored for you.
          </p>
          <div class="flex justify-center sm:justify-start items-center space-x-2">
            <a 
              v-for="social in socialLinks" 
              :key="social.name" 
              :href="social.url" 
              class="text-gray-400 hover:text-white focus:text-white transition-all duration-300 transform hover:scale-110 focus:scale-110 active:scale-95 p-1.5"
            >
              <span class="sr-only">{{ social.name }}</span>
              <component :is="social.icon" class="h-4 w-4" />
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="col-span-1 mt-4 sm:mt-0">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2 text-center sm:text-left">Explore</h3>
          <ul class="space-y-1.5">
            <li v-for="link in quickLinks" :key="link.name">
              <NuxtLink 
                :to="link.path" 
                class="text-gray-400 hover:text-white focus:text-white text-xs flex items-center justify-center sm:justify-start group"
              >
                <ArrowRightIcon class="w-3 h-3 mr-1.5 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300" />
                <span class="group-hover:translate-x-1 group-focus:translate-x-1 transition-transform duration-300">
                  {{ link.name }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="col-span-1 sm:col-span-2 md:col-span-1 mt-4 sm:mt-4 md:mt-0">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2 text-center sm:text-left">Stay Updated</h3>
          <form @submit.prevent="subscribe" class="space-y-2">
            <input
              v-model="email"
              type="email"
              required
              placeholder="Enter your email"
              class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 text-xs transition-all duration-300"
            />
            <button
              type="submit"
              :disabled="isSubscribing"
              class="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs py-2 px-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 focus:from-blue-600 focus:to-cyan-600 transition-all duration-300 transform hover:scale-105 focus:scale-105 active:scale-95 flex items-center justify-center relative overflow-hidden"
            >
              <span v-if="!isSubscribing" class="relative z-10 flex items-center">
                Subscribe
                <ArrowRightIcon class="w-3 h-3 ml-1.5 transform group-hover:translate-x-0.5 group-focus:translate-x-0.5 transition-transform duration-300" />
              </span>
              <span v-else class="relative z-10">Subscribing...</span>
              <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 hover:opacity-20 focus:opacity-20 transition-opacity duration-300"></div>
            </button>
          </form>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-800 my-4"></div>

      <!-- Bottom Footer -->
      <div class="flex flex-col sm:flex-row justify-between items-center text-gray-400 text-xs">
        <p>
          © {{ new Date().getFullYear() }} Neflixify. All rights reserved.
        </p>
        <div class="flex space-x-4 mt-2 sm:mt-0">
          <NuxtLink to="/privacy" class="hover:text-white focus:text-white transition-colors duration-300">
            Privacy
          </NuxtLink>
          <NuxtLink to="/terms" class="hover:text-white focus:text-white transition-colors duration-300">
            Terms
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <div 
      v-if="showToast" 
      class="fixed bottom-4 left-1/2 transform -translate-x-1/2 sm:bottom-4 sm:right-4 sm:left-auto sm:transform-none bg-blue-500/90 text-white px-3 py-2 rounded-lg flex items-center text-xs backdrop-blur-sm animate-toast-slide max-w-[90%] sm:max-w-xs"
    >
      <CheckCircleIcon class="w-4 h-4 mr-1.5" />
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

const email = ref('')
const showToast = ref(false)
const toastMessage = ref('')
const isSubscribing = ref(false)

const subscribe = async () => {
  isSubscribing.value = true
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
  toastMessage.value = 'Subscribed successfully!'
  showToast.value = true
  email.value = ''
  isSubscribing.value = false
  setTimeout(() => showToast.value = false, 3000)
}
</script>

<style scoped>
/* Footer slide-in animation */
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-footer-slide {
  animation: slide-up 0.8s ease-out forwards;
}

/* Toast slide-in animation */
@keyframes toast-slide {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-toast-slide {
  animation: toast-slide 0.5s ease-out forwards;
}

/* Gradient text animation */
@keyframes gradient-flow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-flow 3s linear infinite;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-footer-slide,
  .animate-toast-slide,
  .animate-gradient,
  .transition-all,
  .transition-opacity,
  .transition-transform,
  .transition-colors {
    animation: none;
    transition: none;
  }
}

/* Ensure touch targets are accessible */
button, a {
  touch-action: manipulation;
  min-height: 36px;
  min-width: 36px;
}

/* Center the grid container */
.grid {
  display: grid;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}

/* Responsive adjustments */
@media (max-width: 479px) {
  .px-4 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .py-6 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .grid {
    gap: 0.75rem;
  }
  .space-y-2 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 0.5rem;
  }
  .space-y-1\.5 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 0.375rem;
  }
  .my-4 {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }
  .text-base {
    font-size: 0.875rem;
  }
  .text-xs {
    font-size: 0.6875rem;
  }
  .p-1\.5 {
    padding: 0.25rem;
  }
  .p-3 {
    padding: 0.5rem;
  }
  .py-2 {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
  }
}

@media (min-width: 480px) and (max-width: 639px) {
  .px-4 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  .grid {
    gap: 1rem;
  }
  .text-xs {
    font-size: 0.75rem;
  }
}

@media (min-width: 640px) and (max-width: 767px) {
  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .grid {
    gap: 1.25rem;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .px-4 {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
  .grid {
    gap: 1.5rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .sm\:col-span-2 {
    grid-column: span 2 / span 2;
  }
}

@media (min-width: 1024px) {
  .px-4 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  .grid {
    gap: 2rem;
  }
}
</style>