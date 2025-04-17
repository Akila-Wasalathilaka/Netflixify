<template>
  <header class="bg-black border-b border-gray-800 sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <div class="relative">
            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-75"></div>
            <span class="relative text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300">
              Neflixify
            </span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.name" 
            :to="link.path" 
            class="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            :class="{ 'text-white': $route.path === link.path }"
          >
            {{ link.name }}
          </NuxtLink>
          
          <!-- Search Button -->
          <button
            @click="toggleSearch"
            class="text-gray-400 hover:text-white transition-colors duration-300"
            aria-label="Search"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </nav>

        <!-- Mobile Menu Button -->
        <div class="flex items-center md:hidden">
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="text-gray-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden pb-4 bg-gray-900 rounded-lg mt-1">
          <div class="px-2 pt-2 space-y-2">
            <NuxtLink 
              v-for="link in navLinks" 
              :key="link.name" 
              :to="link.path" 
              @click="isMobileMenuOpen = false"
              class="block px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-300"
              :class="{ 'text-white bg-gray-800': $route.path === link.path }"
            >
              {{ link.name }}
            </NuxtLink>
          </div>
        </div>
      </transition>

      <!-- Search Bar -->
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div v-if="showSearch" class="py-3">
          <div class="relative">
            <input
              type="text"
              placeholder="Search movies, TV shows..."
              class="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 text-white placeholder-gray-500 text-sm"
            />
            <button
              @click="toggleSearch"
              class="absolute right-3 top-2 text-gray-400 hover:text-white"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Movies', path: '/movies' },
  { name: 'TV Shows', path: '/tv-shows' },
  { name: 'Top Rated', path: '/top-rated' }
]

const isMobileMenuOpen = ref(false)
const showSearch = ref(false)

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    isMobileMenuOpen.value = false
  }
}
</script>