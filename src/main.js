import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' // <- WICHTIG: aus router/index.js importieren

import { useAuthStore } from './stores/auth'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router) // <- HIER wird der Router eingebunden

const authStore = useAuthStore()

// Auth-Status überwachen und erst mounten, wenn er bekannt ist
onAuthStateChanged(auth, (user) => {
  authStore.user = user
  authStore.isAuthReady = true
  if (!app._container) { // verhindert doppeltes Mounten
    app.mount('#app')
  }
})
