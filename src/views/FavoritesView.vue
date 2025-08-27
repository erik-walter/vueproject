<template>
  <div>
    <h1>Favoriten</h1>
    <GameList :games="favoriteGames" @toggleFavorite="toggleFavorite" />
  </div>
</template>

<script>
import GameList from '../components/GameList.vue'

export default {
  name: 'FavoritesView',
  components: { GameList },
  data() {
    return {
      // Hier könntest du nur die favorisierten Spiele laden
      favoriteGames: []
    }
  },
  methods: {
    toggleFavorite(game) {
      // Favoritenstatus umschalten und Liste aktualisieren
      game.favorite = !game.favorite
      this.favoriteGames = this.favoriteGames.filter(g => g.favorite)
    }
  }
}
</script>
