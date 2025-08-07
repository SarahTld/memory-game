<template>
  <div class="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
    <!-- Animation de fond globale -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute w-96 h-96 bg-pink-400 opacity-30 rounded-full blur-3xl top-[-10%] left-[-10%] animate-pulse"></div>
      <div class="absolute w-80 h-80 bg-indigo-400 opacity-20 rounded-full blur-2xl bottom-[-10%] right-[-10%] animate-pulse"></div>
    </div>
    <div class="flex-1 flex flex-col z-10">
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </div>
    <AppFooter v-if="isHomePage" />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isHomePage = computed(() => route.path === '/')
</script>
