<template>
  <div class="home">
    <h1>RAWG Spiele</h1>

    <div class="controls">
      <SearchBar v-model="search" />
      <SortDropdown v-model="sortOrder" />
    </div>

    <GameList :games="gamesWithFavorites" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import SortDropdown from '../components/SortDropdown.vue'
import GameList from '../components/GameList.vue'
import { useFavoritesStore } from '../stores/favorites'

export default {
  name: 'HomeView',
  components: { SearchBar, SortDropdown, GameList },
  setup() {
    const search = ref('')
    const sortOrder = ref('desc')
    const games = ref([])
    const favoritesStore = useFavoritesStore()

    onMounted(async () => {
      const apiKey = process.env.VUE_APP_RAWG_API_KEY
      try {
        const res = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
        const data = await res.json()
        games.value = data.results
      } catch (err) {
        console.error(err)
      }
      await favoritesStore.loadFavorites()
    })

    const gamesWithFavorites = computed(() =>
      games.value
        .filter(game => game.name.toLowerCase().includes(search.value.toLowerCase()))
        .sort((a, b) =>
          sortOrder.value === 'asc'
            ? new Date(a.released) - new Date(b.released)
            : new Date(b.released) - new Date(a.released)
        )
        .map(game => ({
          ...game,
          favorite: favoritesStore.isFavorite(game.id)
        }))
    )

    return { search, sortOrder, gamesWithFavorites }
  }
}
</script>

<style scoped>
.home {
  background-color: #121212;
  color: #f0f0f0;
  min-height: 100vh;
  text-align: center;
  padding: 40px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

/* Grid für 3 Spiele pro Reihe */
.games-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* immer 3 pro Zeile */
  gap: 20px;
  justify-items: center;
  padding: 0;
  margin: 0 auto;
  max-width: 800px; /* optional, damit es zentriert bleibt */
}
</style>
