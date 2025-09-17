<template>
  <li class="game-card">
    <img :src="game.background_image" alt="game cover" class="game-image">
    <div class="game-info">
      <strong class="game-name">{{ game.name }}</strong>
      <span class="game-released">Released: {{ game.released || 'Unknown' }}</span>
      <button class="favorite-btn" @click="toggle">
        {{ isFavorite ? '❤️' : '🤍' }}
      </button>
    </div>
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

    const isFavorite = computed(() => favoritesStore.isFavorite(props.game.id))

    const toggle = () => {
      favoritesStore.toggleFavorite(props.game.id)
    }

    return { isFavorite, toggle }
  }
}
</script>

<style scoped>
.game-card {
  list-style: none;
  background-color: #1f1f1f;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
  padding: 15px;
  width: 200px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.7);
}

.game-image {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
}

.game-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-name {
  font-size: 1.1rem;
  margin-bottom: 5px;
  color: #ffffff;
}

.game-released {
  font-size: 0.9rem;
  color: #b0b0b0;
  margin-bottom: 10px;
}

.favorite-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.favorite-btn:hover {
  transform: scale(1.2);
}
</style>
