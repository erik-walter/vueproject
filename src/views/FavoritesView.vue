<template>
  <div>
    <h1>Favoriten</h1>
    <GameList :games="favoriteGames" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useFavoritesStore } from '../stores/favorites'
import GameList from '../components/GameList.vue'

export default {
  name: 'FavoritesView',
  components: { GameList },
  setup() {
    const favoritesStore = useFavoritesStore()

    // Favoriten aus Store
    const favoriteGames = computed(() =>
      favoritesStore.favorites.map(id => ({
        id,
        name: `Game ${id}`,             // Platzhalter falls API-Daten fehlen
        released: 'unknown',
        background_image: 'https://via.placeholder.com/200',
        favorite: true
      }))
    )

    return { favoriteGames }
  }
}
</script>
