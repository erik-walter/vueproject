<template>
  <div id="app">
    <!-- Navigation -->
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/favorites">Favoriten</router-link>
    </nav>

    <!-- Hier werden die Seiten geladen -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
nav {
  text-align: center;
  margin: 20px;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}
nav a.router-link-active {
  font-weight: bold;
}
</style>
