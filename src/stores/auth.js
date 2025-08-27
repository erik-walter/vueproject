import { defineStore } from 'pinia'
import { auth } from '../firebase'
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthReady: false // NEU
  }),
  actions: {
    async register(email, password) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      this.user = userCredential.user
    },
    async login(email, password) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      this.user = userCredential.user
    },
    async logout() {
      await signOut(auth)
      this.user = null
    },
    initAuth() {
      onAuthStateChanged(auth, (user) => {
        this.user = user
        this.isAuthReady = true // Auth-Status ist nun bekannt
      })
    }
  }
})


