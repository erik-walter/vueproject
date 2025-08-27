<template>
  <div>
    <h2>{{ isLogin ? 'Login' : 'Registrieren' }}</h2>
    <form @submit.prevent="submit">
      <input type="email" v-model="email" placeholder="E-Mail" required />
      <input type="password" v-model="password" placeholder="Passwort" required />
      <button type="submit">{{ isLogin ? 'Login' : 'Registrieren' }}</button>
    </form>
    <button @click="toggleMode">
      {{ isLogin ? 'Noch keinen Account? Registrieren' : 'Schon einen Account? Login' }}
    </button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'AuthForm',
  setup() {
    const authStore = useAuthStore()
    const email = ref('')
    const password = ref('')
    const isLogin = ref(true)

    const submit = async () => {
      try {
        if (isLogin.value) {
          await authStore.login(email.value, password.value)
        } else {
          await authStore.register(email.value, password.value)
        }
        email.value = ''
        password.value = ''
      } catch (err) {
        alert(err.message)
      }
    }

    const toggleMode = () => {
      isLogin.value = !isLogin.value
    }

    return { email, password, isLogin, submit, toggleMode }
  }
}
</script>
