<template>
  <div id="app">
    <nav class="nav-bar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/favorites" class="nav-link">Favoriten</router-link>
      <button class="auth-btn" @click="toggleAuth">
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

<style scoped>
/* Nav Container */
.nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 15px 0;
  background-color: #1f1f1f;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Links */
.nav-link {
  text-decoration: none;
  color: #42b983;
  font-weight: 500;
  transition: color 0.2s, transform 0.2s;
}

.nav-link:hover {
  color: #76e2a0;
  transform: scale(1.1);
}

.nav-link.router-link-active {
  font-weight: bold;
  color: #76e2a0;
}

/* Auth Button */
.auth-btn {
  padding: 6px 15px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s, transform 0.2s;
}

.auth-btn:hover {
  background-color: #76e2a0;
  transform: scale(1.05);
}

/* Optional: Dark Mode for App Background */
#app {
  background-color: #121212;
  color: #f0f0f0;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
