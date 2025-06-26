<template>
  <div
    class="relative min-h-[60vh] w-full flex flex-col items-center justify-center"
  >
    <!-- Fond dégradé identique à l'accueil -->
    <div
      class="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200"
    ></div>
    <div
      class="z-10 w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 flex flex-col items-center border border-purple-100"
    >
      <!-- <h2 class="text-3xl sm:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400 drop-shadow-lg text-center">Plateau de jeu</h2> -->
      <div class="mb-2 flex items-center gap-4">
        <span class="text-purple-600 font-semibold">Coups : {{ moves }}</span>
        <button
          @click="resetBoard"
          class="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow hover:from-indigo-500 hover:to-pink-400 hover:scale-105 transition-all"
        >
          Recommencer
        </button>
      </div>
      <div class="mb-4 text-sm text-green-700" v-if="bestScore !== null">
        🏆 Meilleur score : <span class="font-bold">{{ bestScore }}</span> coups
      </div>
      <div class="grid grid-cols-4 gap-4 mt-4">
        <div v-for="(card, idx) in cards" :key="card.id" class="relative">
          <button
            class="w-20 h-28 sm:w-24 sm:h-32 rounded-xl shadow-xl flex items-center justify-center text-3xl font-bold transition-transform duration-200 bg-gradient-to-br from-purple-200 to-pink-200 border-2 border-purple-300 cursor-pointer select-none card-3d"
            :class="{
              'bg-white border-green-400 scale-105 ring-2 ring-green-300':
                card.flipped || card.matched,
              'opacity-60 pointer-events-none': card.matched,
            }"
            @click="flipCard(idx)"
            :disabled="card.flipped || card.matched"
          >
            <span v-if="card.flipped || card.matched">{{ card.emoji }}</span>
            <span v-else>?</span>
          </button>
        </div>
      </div>
      <transition name="fade-bounce">
        <div v-if="isWin" class="mt-8 flex flex-col items-center">
          <div class="text-4xl mb-2 animate-bounce">🎉</div>
          <div class="text-green-600 text-2xl font-bold text-center">
            Bravo !<br />Tu as trouvé toutes les paires
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
const props = defineProps<{ level: string }>();

const levelLabel = computed(() => {
  return (
    {
      easy: "Facile",
      medium: "Moyen",
      hard: "Difficile",
    }[props.level] || "Facile"
  );
});

// Niveau facile : 4 paires (8 cartes)
const emojisByLevel = {
  easy: ["🍎", "🍌", "🍇", "🍉"],
  medium: ["🍎", "🍌", "🍇", "🍉", "🍒", "🍍"], // 6 paires
  hard: ["🍎", "🍌", "🍇", "🍉", "🍒", "🍍", "🥝", "🍑"], // 8 paires
};

function getEmojis() {
  return emojisByLevel[props.level] || emojisByLevel.easy;
}

function shuffle(array: any[]) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const cards = ref(
  shuffle([...getEmojis(), ...getEmojis()]).map((emoji, i) => ({
    id: i + "-" + emoji,
    emoji,
    flipped: false,
    matched: false,
  }))
);

const flippedIndexes = ref<number[]>([]);
const moves = ref(0);
const bestScore = ref<number | null>(null);
const isWin = computed(() => cards.value.every((card) => card.matched));

const storageKey = computed(() => `memory-best-score-${props.level}`);

function loadBestScore() {
  const val = localStorage.getItem(storageKey.value);
  bestScore.value = val ? parseInt(val) : null;
}

function saveBestScore() {
  if (bestScore.value === null || moves.value < bestScore.value) {
    bestScore.value = moves.value;
    localStorage.setItem(storageKey.value, moves.value.toString());
  }
}

function flipCard(idx: number) {
  if (
    flippedIndexes.value.length === 2 ||
    cards.value[idx].flipped ||
    cards.value[idx].matched
  )
    return;
  cards.value[idx].flipped = true;
  flippedIndexes.value.push(idx);
  if (flippedIndexes.value.length === 2) {
    moves.value++;
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [i1, i2] = flippedIndexes.value;
  if (cards.value[i1].emoji === cards.value[i2].emoji) {
    cards.value[i1].matched = true;
    cards.value[i2].matched = true;
    if (isWin.value) saveBestScore();
  } else {
    cards.value[i1].flipped = false;
    cards.value[i2].flipped = false;
  }
  flippedIndexes.value = [];
}

function resetBoard() {
  cards.value = shuffle([...getEmojis(), ...getEmojis()]).map((emoji, i) => ({
    id: i + "-" + emoji,
    emoji,
    flipped: false,
    matched: false,
  }));
  flippedIndexes.value = [];
  moves.value = 0;
}

// Reset board si niveau change
watch(
  () => props.level,
  () => {
    resetBoard();
    loadBestScore();
  }
);

onMounted(() => {
  loadBestScore();
});
</script>

<style scoped>
.card-3d {
  box-shadow: 0 4px 16px 0 rgba(168, 139, 250, 0.15),
    0 1.5px 6px 0 rgba(244, 114, 182, 0.1);
  transition: box-shadow 0.2s, transform 0.2s;
}
.card-3d:hover:not(:disabled) {
  box-shadow: 0 8px 32px 0 rgba(168, 139, 250, 0.25),
    0 3px 12px 0 rgba(244, 114, 182, 0.18);
  transform: translateY(-4px) scale(1.07) rotateZ(-2deg);
}
.fade-bounce-enter-active {
  animation: fadeBounceIn 0.8s;
}
@keyframes fadeBounceIn {
  0% {
    opacity: 0;
    transform: scale(0.7) translateY(40px);
  }
  60% {
    opacity: 1;
    transform: scale(1.1) translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
