<template>
  <li>
    <strong>{{ game.name }}</strong> - Released: {{ game.released }}
    <br>
    <img :src="game.background_image" alt="game cover" width="200">
    <button @click="toggle">
      {{ isFavorite ? '❤️' : '🤍' }}
    </button>
  </li>
</template>

<script>
import { computed } from 'vue'
import { useFavoritesStore } from '../stores/favorites'

export default {
  name: 'GameItem',
  props: ['game'],
  setup(props) {
    const favoritesStore = useFavoritesStore()

    // Prüfen, ob dieses Spiel Favorit ist
    const isFavorite = computed(() => favoritesStore.isFavorite(props.game.id))

    // Klick auf Herz → Toggle in Store (und Firebase)
    const toggle = () => {
      favoritesStore.toggleFavorite(props.game.id)
    }

    return { isFavorite, toggle }
  }
}
</script>

<style>
li {
  list-style: none;
  margin-bottom: 20px;
}
</style>
