<template>
  <ul class="games-grid">
    <GameItem
      v-for="game in games"
      :key="game.id"
      :game="game"
      @toggleFavorite="$emit('toggleFavorite', $event)"
    />
  </ul>
</template>

<script>
import GameItem from './GameItem.vue'

export default {
  name: 'GameList',
  components: { GameItem },
  props: ['games']
}
</script>

<style scoped>
.games-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 Karten pro Reihe */
  gap: 20px; /* Abstand zwischen Karten */
  justify-items: center;
  padding: 0;
  margin: 0 auto;
  list-style: none;
  max-width: 900px; /* optional, zentriert das Grid */
}
</style>
