<template>
  <!-- Collapsible Sidebar (hidden on mobile) -->
  <aside 
    class="bg-gray-900 border-r border-gray-800 fixed left-0 top-0 h-full z-50 transition-all duration-300 hidden md:block"
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

  <!-- Mobile Header Bar -->
  <header class="bg-gray-900 border-b border-gray-800 fixed top-0 left-0 right-0 z-50 md:hidden">
    <div class="flex items-center justify-between px-4 py-3">
      <!-- Mobile Logo -->
      <NuxtLink to="/" class="overflow-hidden">
        <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">
          Neflixify
        </span>
      </NuxtLink>
      
      <div class="flex items-center space-x-4">
        <!-- Mobile Search Button -->
        <button 
          @click="toggleSearch"
          class="p-2 text-gray-400 hover:text-white rounded-lg"
        >
          <MagnifyingGlassIcon class="w-6 h-6" />
        </button>
        
        <!-- Mobile Hamburger Menu Button -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="p-2 text-gray-400 hover:text-white rounded-lg"
          aria-label="Menu"
        >
          <Bars3Icon v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <XMarkIcon v-else class="w-6 h-6" />
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu Dropdown -->
    <div 
      v-if="isMobileMenuOpen" 
      class="absolute top-full left-0 right-0 bg-gray-900 border-b border-gray-800 py-4 shadow-lg"
    >
      <nav>
        <NuxtLink
          v-for="link in navLinks"
          :key="link.name"
          :to="link.path"
          class="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors"
          :class="$route.path === link.path ? 'text-blue-400' : 'text-gray-400'"
          @click="isMobileMenuOpen = false"
        >
          <component :is="link.icon" class="w-5 h-5 mr-3" />
          <span>{{ link.name }}</span>
        </NuxtLink>
      </nav>
    </div>
  </header>

  <!-- Main Content Area -->
  <div 
    class="transition-all duration-300 pt-0 md:pt-0"
    :class="{
      'md:ml-20': isCollapsed,
      'md:ml-64': !isCollapsed,
      'mt-16': true, // Add margin top for mobile header
    }"
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
  XMarkIcon,
  Bars3Icon // Added for hamburger menu
} from '@heroicons/vue/24/outline'

const route = useRoute()
const navLinks = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Movies', path: '/movies', icon: FilmIcon },
  { name: 'TV Shows', path: '/tv-shows', icon: TvIcon },
  { name: 'Top Rated', path: '/top-rated', icon: ChartBarIcon }
]

// Responsive states
const isCollapsed = ref(true)
const showSearch = ref(false)
const isMobileMenuOpen = ref(false)

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  // Close mobile menu if open
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

// Close mobile menu when screen size changes to desktop
const handleResize = () => {
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

// Add resize event listener
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

// Clean up event listener
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
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

/* Mobile menu transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>