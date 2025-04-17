export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  css: [
    'swiper/css',
    'swiper/css/effect-creative'
  ],

  runtimeConfig: {
    public: {
      tmdbApiKey: process.env.TMDB_API_KEY,
      tmdbBaseUrl: process.env.TMDB_BASE_URL
    }
  },

  compatibilityDate: '2025-04-17'
})