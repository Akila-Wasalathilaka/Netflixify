<template>
  <!-- Collapsible Sidebar (hidden on mobile) -->
  <aside 
    class="bg-gray-900 border-r border-gray-800 fixed left-0 top-0 h-full z-50 transition-all duration-300 hidden md:block"
    :class="isCollapsed ? 'w-20' : 'w-64'"
  >
    <div class="flex flex-col h-full p-4">
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
      <NuxtLink to="/" class="overflow-hidden">
        <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">
          Neflixify
        </span>
      </NuxtLink>
      <div class="flex items-center space-x-4">
        <button 
          @click="toggleSearch"
          class="p-2 text-gray-400 hover:text-white rounded-lg"
        >
          <MagnifyingGlassIcon class="w-6 h-6" />
        </button>
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
      'mt-16': true,
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
        <div v-else-if="searchResults.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          <div 
            v-for="item in searchResults" 
            :key="item.id" 
            class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <NuxtLink :to="`/${item.media_type}/${item.id}`" class="block group">
              <div class="aspect-w-2 aspect-h-3 overflow-hidden">
                <img 
                  :src="item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/500x750'" 
                  :alt="item.title || item.name"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="p-4">
                <h3 class="font-bold text-lg mb-2 truncate">{{ item.title || item.name }}</h3>
                <div class="flex items-center justify-between">
                  <span class="text-yellow-400">
                    {{ (item.vote_average || 0).toFixed(1) }}/10
                  </span>
                  <span class="text-gray-400 text-sm">
                    {{ item.release_date || item.first_air_date
                      ? new Date(item.release_date || item.first_air_date).getFullYear()
                      : 'N/A' }}
                  </span>
                </div>
              </div>
            </NuxtLink>
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
  StarIcon
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

const isCollapsed = ref(true)
const showSearch = ref(false)
const isMobileMenuOpen = ref(false)

const searchQuery = ref('')
const searchResults = ref([])
const isSearching = ref(false)
const searchInput = ref(null)
const searchDebounceTimeout = ref(null)

const popularSearchTerms = [
  'Action', 'Comedy', 'Sci-Fi', 'Drama', 'Horror',
  'Marvel', 'DC', 'Star Wars', 'Thriller', 'Animation'
]

const searchTMDB = async (query) => {
  if (!query || query.trim() === '') {
    return []
  }
  
  isSearching.value = true
  
  try {
    const response = await fetch(
      `${config.public.tmdbBaseUrl}/search/multi?api_key=${config.public.tmdbApiKey}&query=${encodeURIComponent(query)}`
    )
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }
    
    const data = await response.json()
    
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

const handleSearch = () => {
  if (searchDebounceTimeout.value) {
    clearTimeout(searchDebounceTimeout.value)
  }
  
  searchDebounceTimeout.value = setTimeout(async () => {
    if (searchQuery.value.trim() !== '') {
      const results = await searchTMDB(searchQuery.value)
      searchResults.value = results
    } else {
      searchResults.value = []
    }
  }, 300)
}

const navigateToItem = (item) => {
  showSearch.value = false
  router.push(`/${item.media_type}/${item.id}`)
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  
  if (showSearch.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  } else {
    searchQuery.value = ''
    searchResults.value = []
  }
  
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

const handleKeyDown = (event) => {
  if (event.key === 'Escape' && showSearch.value) {
    toggleSearch()
  }
}

const handleResize = () => {
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleKeyDown)
  
  if (searchDebounceTimeout.value) {
    clearTimeout(searchDebounceTimeout.value)
  }
})
</script>

<style>
.aside {
  transition-property: width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

::-webkit-scrollbar {
  display: none;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.search-results-enter-active,
.search-results-leave-active {
  transition: opacity 0.3s;
}

.search-results-enter-from,
.search-results-leave-to {
  opacity: 0;
}
</style>