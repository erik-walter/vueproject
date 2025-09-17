<template>
  <div class="favorites">
    <h1>Favoriten</h1>
    <GameList :games="favoriteGames" />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import GameList from '../components/GameList.vue'
import { useFavoritesStore } from '../stores/favorites'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'FavoritesView',
  components: { GameList },
  setup() {
    const authStore = useAuthStore()
    const favoritesStore = useFavoritesStore()
    const allGames = ref([])

    // Spiele von RAWG laden
    const loadGames = async () => {
      const apiKey = process.env.VUE_APP_RAWG_API_KEY
      try {
        const res = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
        const data = await res.json()
        allGames.value = data.results
      } catch (err) {
        console.error(err)
      }
    }

    // Favoriten aus Firebase laden
    const loadFavorites = async () => {
      if (authStore.user) {
        await favoritesStore.loadFavorites()
      } else {
        const unwatch = watch(
          () => authStore.user,
          async (user) => {
            if (user) {
              await favoritesStore.loadFavorites()
              unwatch()
            }
          }
        )
      }
    }

    onMounted(async () => {
      await loadGames()
      await loadFavorites()
    })

    // Favoriten-Spiele filtern
    const favoriteGames = computed(() =>
      allGames.value
        .filter(game => favoritesStore.isFavorite(game.id))
        .map(game => ({ ...game, favorite: true }))
    )

    return { favoriteGames }
  }
}
</script>

<style scoped>
.favorites {
  background-color: #121212;
  color: #f0f0f0;
  min-height: 100vh;
  text-align: center;
  padding: 40px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Überschrift */
.favorites h1 {
  margin-bottom: 30px;
  font-size: 2.2rem;
  color: #ffffff;
  text-shadow: 1px 1px 3px #000000;
}

/* Grid in GameList anwenden */
.games-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* immer 3 pro Reihe */
  justify-items: center;
  padding: 0;
  list-style: none;
  max-width: 800px;
}
</style>
