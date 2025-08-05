import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,
  nitro: {
    preset: 'github_pages'
  },
  app: {
    baseURL: '/memory-game/'
  },
  router: {
    options: {
      hashMode: true
    }
  }
})
