<template>
  <div class="auth-container">
    <h2>{{ isLogin ? 'Login' : 'Registrieren' }}</h2>
    <form @submit.prevent="submit" class="auth-form">
      <input type="email" v-model="email" placeholder="E-Mail" required />
      <input type="password" v-model="password" placeholder="Passwort" required />
      <button type="submit">{{ isLogin ? 'Login' : 'Registrieren' }}</button>
    </form>

    <button class="toggle-btn" @click="toggleMode">
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

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px 25px;
  background-color: #1f1f1f;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.6);
  text-align: center;
}

.auth-container h2 {
  margin-bottom: 25px;
  color: #42b983;
  font-size: 1.8rem;
  text-shadow: 1px 1px 3px #000;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.auth-form input {
  padding: 12px 15px;
  border-radius: 8px;
  border: none;
  background-color: #2c2c2c;
  color: #f0f0f0;
  font-size: 1rem;
  transition: background-color 0.2s, box-shadow 0.2s;
}

.auth-form input:focus {
  outline: none;
  background-color: #3a3a3a;
  box-shadow: 0 0 5px #42b983;
}

.auth-form button {
  padding: 12px 15px;
  border: none;
  border-radius: 8px;
  background-color: #42b983;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.auth-form button:hover {
  background-color: #76e2a0;
  transform: scale(1.05);
}

.toggle-btn {
  margin-top: 15px;
  background: none;
  border: none;
  color: #42b983;
  cursor: pointer;
  font-size: 0.95rem;
  transition: color 0.2s, text-decoration 0.2s;
}

.toggle-btn:hover {
  color: #76e2a0;
  text-decoration: underline;
}
</style>
