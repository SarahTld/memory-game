<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 relative overflow-hidden">
      <!-- Animation de fond -->
      <div class="absolute inset-0 z-0">
        <div class="absolute w-96 h-96 bg-pink-400 opacity-30 rounded-full blur-3xl top-[-10%] left-[-10%] animate-pulse"></div>
        <div class="absolute w-80 h-80 bg-indigo-400 opacity-20 rounded-full blur-2xl bottom-[-10%] right-[-10%] animate-pulse"></div>
      </div>
      <div class="z-10 w-full max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-purple-100 transition-transform duration-300 hover:shadow-3xl">
        <!-- Illustration SVG -->
        <svg class="w-24 h-24 mb-4 animate-bounce-slow" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="8" width="48" height="48" rx="10" fill="#a78bfa"/>
          <rect x="16" y="16" width="32" height="32" rx="6" fill="#f472b6"/>
          <rect x="24" y="24" width="16" height="16" rx="3" fill="#fef9c3"/>
        </svg>
        <h1 class="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400 drop-shadow-lg animate-gradient-x text-center">Jeu de Mémoire</h1>
        <p class="mb-8 text-lg text-gray-700 text-center">Bienvenue ! Prêt·e à défier ta mémoire ?<br>Choisis ton niveau pour commencer et amuse-toi à retrouver toutes les paires de cartes !</p>
        <div class="flex flex-col gap-4 w-full">
          <NuxtLink v-for="level in levels" :key="level.value" :to="`/game?level=${level.value}`"
            class="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl shadow-lg hover:scale-105 hover:from-indigo-500 hover:to-pink-400 transition-all duration-200 text-center">
            {{ level.label }}
          </NuxtLink>
        </div>
      </div>
      <!-- <AppFooter class="mt-10"/> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'

const levels = [
  { label: 'Facile', value: 'easy' },
  { label: 'Moyen', value: 'medium' },
  { label: 'Difficile', value: 'hard' }
]
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