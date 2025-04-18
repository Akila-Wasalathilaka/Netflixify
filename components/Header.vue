<template>
  <!-- Collapsible Sidebar -->
  <aside 
    class="bg-gray-900 border-r border-gray-800 fixed left-0 top-0 h-full z-50 transition-all duration-300"
    :class="isCollapsed ? 'w-20' : 'w-64'"
  >
    <div class="flex flex-col h-full p-4">
      <!-- Logo and Toggle -->
      <div class="flex flex-col items-center mb-8">
        <NuxtLink v-if="!isCollapsed" to="/" class="overflow-hidden">
          <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 transition-all duration-300">
            Neflixify
          </span>
        </NuxtLink>
        <button 
          @click="isCollapsed = !isCollapsed"
          class="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 mt-4"
        >
          <ChevronLeftIcon class="w-5 h-5 transition-transform" :class="{ 'rotate-180': isCollapsed }" />
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav class="space-y-2 flex-1">
        <div class="flex flex-col items-center space-y-4">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            class="flex flex-col items-center p-3 rounded-lg group transition-colors"
            :class="[ $route.path === link.path ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-gray-800 text-gray-400 hover:text-white' ]"
          >
            <component :is="link.icon" class="w-6 h-6 flex-shrink-0" />
            <span 
              class="mt-2 text-sm font-medium transition-opacity"
              :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'"
            >
              {{ link.name }}
            </span>
          </NuxtLink>
          <!-- Search Icon -->
          <button 
            @click="toggleSearch"
            class="flex flex-col items-center p-3 rounded-lg group transition-colors text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <MagnifyingGlassIcon class="w-6 h-6" />
            <span 
              class="mt-2 text-sm transition-opacity"
              :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'"
            >
              Search
            </span>
          </button>
        </div>
      </nav>
    </div>
  </aside>

  <!-- Main Content Area -->
  <div 
    class="transition-all duration-300"
    :class="isCollapsed ? 'ml-20' : 'ml-64'"
  >
    <!-- Search Overlay -->
    <div v-if="showSearch" class="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-40">
      <div class="max-w-2xl mx-auto mt-20 px-4">
        <div class="relative">
          <input
            type="text"
            placeholder="Search movies, TV shows..."
            class="w-full p-4 bg-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="toggleSearch"
            class="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  HomeIcon,
  FilmIcon,
  TvIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const navLinks = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Movies', path: '/movies', icon: FilmIcon },
  { name: 'TV Shows', path: '/tv-shows', icon: TvIcon },
  { name: 'Top Rated', path: '/top-rated', icon: ChartBarIcon }
]

// Set initial state to collapsed
const isCollapsed = ref(true)
const showSearch = ref(false)

const toggleSearch = () => {
  showSearch.value = !showSearch.value
}
</script>

<style>
/* Smooth transitions for collapsed state */
.aside {
  transition-property: width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hide scrollbar but keep functionality */
::-webkit-scrollbar {
  display: none;
}
</style>
