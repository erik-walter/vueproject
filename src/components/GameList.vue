<template>
  <ul>
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
