import { defineStore } from 'pinia'
import { db } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useAuthStore } from './auth'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] // Array der Game-IDs
  }),
  actions: {
    async loadFavorites() {
      const authStore = useAuthStore()
      if (!authStore.user) return

      const ref = doc(db, 'users', authStore.user.uid)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        this.favorites = snap.data().favorites || []
      }
    },
    async toggleFavorite(gameId) {
      const authStore = useAuthStore()
      if (!authStore.user) return

      if (this.favorites.includes(gameId)) {
        this.favorites = this.favorites.filter(id => id !== gameId)
      } else {
        this.favorites.push(gameId)
      }

      // In Firestore speichern
      const ref = doc(db, 'users', authStore.user.uid)
      await setDoc(ref, { favorites: this.favorites }, { merge: true })
    },
    isFavorite(gameId) {
      return this.favorites.includes(gameId)
    }
  }
})
