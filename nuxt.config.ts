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

  alias: {
    '~/': './', // This maps `~` to the root of your project
  },

  compatibilityDate: '2025-04-17'
})
