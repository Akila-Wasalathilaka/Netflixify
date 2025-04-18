export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'], // Include TailwindCSS module

  css: [
    'swiper/css', // Swiper CSS
    'swiper/css/effect-creative' // Swiper effect-creative CSS
  ],

  runtimeConfig: {
    public: {
      tmdbApiKey: process.env.TMDB_API_KEY, // API key from environment variable
      tmdbBaseUrl: process.env.TMDB_BASE_URL // Base URL from environment variable
    }
  },

  alias: {
    '~/': './' // Maps `~` to the root of your project
  },

  compatibilityDate: '2025-04-17', // Compatibility date for your project

  ssr: false, // Enable server-side rendering
  target: 'static', // Target static site generation
})
