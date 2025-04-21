<template>
  <!-- Collapsible Sidebar (hidden on mobile) -->
  <aside 
    class="bg-gray-900 border-r border-gray-800 fixed left-0 top-0 h-full z-50 transition-all duration-300 hidden md:block"
    :class="isCollapsed ? 'w-20' : 'w-64'"
  >
    <!-- Sidebar content remains the same as in your original code -->
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
    <!-- Search Overlay with Results -->
    <div v-if="showSearch" class="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-40 overflow-y-auto">
      <div class="max-w-4xl mx-auto mt-20 px-4 pb-20">
        <div class="relative mb-6">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search movies, TV shows..."
            class="w-full p-4 bg-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            @input="handleSearch"
            ref="searchInput"
            autocomplete="off"
          />
          <button
            @click="toggleSearch"
            class="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="isSearching" class="flex justify-center py-10">
          <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>

        <!-- No Results State -->
        <div v-else-if="searchQuery && searchResults.length === 0 && !isSearching" class="text-center py-10">
          <p class="text-gray-400">No results found for "{{ searchQuery }}"</p>
        </div>

        <!-- Search Results Grid -->
        <div v-else-if="searchResults.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div 
            v-for="item in searchResults" 
            :key="item.id" 
            class="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer"
            @click="navigateToItem(item)"
          >
            <div class="aspect-[2/3] relative">
              <img 
                :src="item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '/placeholder-poster.jpg'" 
                :alt="item.title || item.name"
                class="w-full h-full object-cover"
              />
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <div class="flex items-center">
                  <span class="bg-blue-500 text-xs text-white px-1.5 py-0.5 rounded flex items-center">
                    <StarIcon class="w-3 h-3 mr-1" />
                    {{ item.vote_average ? item.vote_average.toFixed(1) : 'N/A' }}
                  </span>
                  <span class="text-xs text-gray-300 ml-2">
                    {{ item.media_type === 'movie' ? '🎬 Movie' : '📺 TV' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="p-2">
              <h3 class="text-sm font-medium text-white truncate">{{ item.title || item.name }}</h3>
              <p class="text-xs text-gray-400">{{ item.release_date ? item.release_date.substring(0, 4) : (item.first_air_date ? item.first_air_date.substring(0, 4) : 'Unknown') }}</p>
            </div>
          </div>
        </div>

        <!-- Initial State (No Search Yet) -->
        <div v-else-if="searchQuery === ''" class="py-6">
          <h3 class="text-lg font-medium text-white mb-4">Popular Searches</h3>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="term in popularSearchTerms" 
              :key="term"
              @click="searchQuery = term; handleSearch()"
              class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-sm text-gray-300"
            >
              {{ term }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRuntimeConfig } from 'nuxt/app'
import {
  HomeIcon,
  FilmIcon,
  TvIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  XMarkIcon,
  Bars3Icon,
  StarIcon // Added for ratings
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

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

// Search functionality
const searchQuery = ref('')
const searchResults = ref([])
const isSearching = ref(false)
const searchInput = ref(null)
const searchDebounceTimeout = ref(null)

// Common popular searches
const popularSearchTerms = [
  'Action', 'Comedy', 'Sci-Fi', 'Drama', 'Horror',
  'Marvel', 'DC', 'Star Wars', 'Thriller', 'Animation'
]

// TMDB API search function
const searchTMDB = async (query) => {
  if (!query || query.trim() === '') {
    return []
  }
  
  isSearching.value = true
  
  try {
    // Call the TMDB multi-search endpoint to get movies and TV shows
    const response = await fetch(
      `${config.public.tmdbBaseUrl}/search/multi?api_key=${config.public.tmdbApiKey}&query=${encodeURIComponent(query)}`
    )
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Filter to only include movies and TV shows (exclude people and other types)
    const results = data.results.filter(item => 
      item.media_type === 'movie' || item.media_type === 'tv'
    )
    
    return results
  } catch (error) {
    console.error('Error searching TMDB:', error)
    return []
  } finally {
    isSearching.value = false
  }
}

// Handle search with debounce
const handleSearch = () => {
  // Clear previous timeout
  if (searchDebounceTimeout.value) {
    clearTimeout(searchDebounceTimeout.value)
  }
  
  // Set new timeout to avoid excessive API calls
  searchDebounceTimeout.value = setTimeout(async () => {
    if (searchQuery.value.trim() !== '') {
      const results = await searchTMDB(searchQuery.value)
      searchResults.value = results
    } else {
      searchResults.value = []
    }
  }, 300)
}

// Navigate to movie/show details
const navigateToItem = (item) => {
  // Close search overlay
  showSearch.value = false
  
  // Navigate to appropriate page
  if (item.media_type === 'movie') {
    router.push(`/movies/${item.id}`)
  } else {
    router.push(`/tv-shows/${item.id}`)
  }
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  
  // Focus search input when opened
  if (showSearch.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  } else {
    // Clear search when closing
    searchQuery.value = ''
    searchResults.value = []
  }
  
  // Close mobile menu if open
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

// Close search on escape key
const handleKeyDown = (event) => {
  if (event.key === 'Escape' && showSearch.value) {
    toggleSearch()
  }
}

// Close mobile menu when screen size changes to desktop
const handleResize = () => {
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

// Add resize and keydown event listeners
onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('keydown', handleKeyDown)
})

// Clean up event listeners
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleKeyDown)
  
  // Clear any pending timeout
  if (searchDebounceTimeout.value) {
    clearTimeout(searchDebounceTimeout.value)
  }
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

/* Search results animations */
.search-results-enter-active,
.search-results-leave-active {
  transition: opacity 0.3s;
}

.search-results-enter-from,
.search-results-leave-to {
  opacity: 0;
}
</style>