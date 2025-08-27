<template>
  <div class="home">
    <h1>RAWG Spiele</h1>
    <!-- Suchfeld -->
    <SearchBar v-model="search" />
    <!-- Sortier-Dropdown -->
    <SortDropdown v-model="sortOrder" />
    <!-- Spiele-Liste -->
    <GameList :games="filteredGames" @toggleFavorite="toggleFavorite" />
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue'
import SortDropdown from '../components/SortDropdown.vue'
import GameList from '../components/GameList.vue'

export default {
  name: 'HomeView',
  components: { SearchBar, SortDropdown, GameList },
  data() {
    return {
      games: [],      // Alle Spiele von RAWG
      search: '',     // Suchbegriff
      sortOrder: 'desc' // Sortierreihenfolge
    }
  },
  mounted() {
    const apiKey = process.env.VUE_APP_RAWG_API_KEY
    fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        this.games = data.results.map(game => ({ ...game, favorite: false }))
      })
      .catch(err => console.error(err))
  },
  computed: {
    filteredGames() {
      return this.games
        .filter(game => game.name.toLowerCase().includes(this.search.toLowerCase()))
        .sort((a, b) =>
          this.sortOrder === 'asc'
            ? new Date(a.released) - new Date(b.released)
            : new Date(b.released) - new Date(a.released)
        )
    }
  },
  methods: {
    toggleFavorite(game) {
      game.favorite = !game.favorite
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}
</style>
