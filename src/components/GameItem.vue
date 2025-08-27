<template>
  <li>
    <strong>{{ game.name }}</strong> - Released: {{ game.released }}
    <br>
    <img :src="game.background_image" alt="game cover" width="200">
    <button @click="$emit('toggleFavorite', game)">
      {{ game.favorite ? '❤️' : '🤍' }}
    </button>
  </li>
</template>

<script>
export default {
  name: 'GameItem',
  props: ['game']
}
</script>

<style>
li{
  list-style: none;
}
</style>
