<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/favorites">Favoriten</router-link> |
      <button @click="toggleAuth">
        {{ authStore.user ? 'Logout' : 'Login' }}
      </button>
    </nav>
    <AuthForm v-if="showAuth && !authStore.user" />
    <router-view />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from './stores/auth'
import AuthForm from './components/AuthForm.vue'

export default {
  components: { AuthForm },
  setup() {
    const authStore = useAuthStore()
    const showAuth = ref(false)

    const toggleAuth = async () => {
      if (authStore.user) {
        await authStore.logout()
      } else {
        showAuth.value = !showAuth.value
      }
    }

    return { authStore, showAuth, toggleAuth }
  }
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
