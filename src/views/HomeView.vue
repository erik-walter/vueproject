<template>
  <div class="home">
    <h1>RAWG Spiele Test</h1>
    <SearchBar v-model="search" />
    <SortDropdown v-model="sortOrder" />
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

    // API laden & Favoriten initialisieren
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

    // Spiele mit Favoriten-Flag
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
  text-align: center;
  margin-top: 50px;
}
</style>
