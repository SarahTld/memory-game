<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 relative overflow-hidden">
    <!-- Animation de fond -->
    <div class="absolute inset-0 z-0">
      <div class="absolute w-96 h-96 bg-pink-400 opacity-30 rounded-full blur-3xl top-[-10%] left-[-10%] animate-pulse"></div>
      <div class="absolute w-80 h-80 bg-indigo-400 opacity-20 rounded-full blur-2xl bottom-[-10%] right-[-10%] animate-pulse"></div>
    </div>
    <h1 class="z-10 text-3xl sm:text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400 drop-shadow-lg text-center animate-gradient-x">
      Niveau : {{ levelLabel }}
    </h1>
    <div class="z-10 mb-2">
      <NuxtLink to="/" class="text-purple-500 hover:underline">Retour à l'accueil</NuxtLink>
    </div>
    <div class="w-full max-w-2xl">
      <MemoryBoard :level="level" />
    </div>
    <!-- <AppFooter/> -->
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import MemoryBoard from '@/components/MemoryBoard.vue'
import AppFooter from '@/components/AppFooter.vue'

const route = useRoute()
const level = route.query.level || 'easy'

const levelLabel = {
  easy: 'Facile',
  medium: 'Moyen',
  hard: 'Difficile'
}[level as string] || 'Facile'
</script>

<style scoped>
@keyframes gradient-x {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 4s ease-in-out infinite;
}
@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 2.5s infinite;
}
</style> 