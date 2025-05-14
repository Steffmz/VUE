<!-- filepath: c:\Users\wilso\Documents\VUE\proyecto\src\components\UserLogin.vue -->
<template>
  <div>
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login" class="form">
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div class="form-group">
        <label for="username">Usuario:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn">Iniciar Sesión</button>
    </form>
  </div>
</template>

<script>
import { loginUser } from '../services/authService';

export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    login() {
      try {
        const user = loginUser(this.username, this.password);
        this.$emit('login-success', user.username);
        this.$emit('notify', 'Inicio de sesión exitoso', 'success');
      } catch (error) {
        this.$emit('notify', error.message, 'error');
      }
    },
  },
};
</script>

<style scoped>
/* Reutiliza los estilos del formulario de registro */
h2 {
  margin-bottom: 1rem;
  color: #007bff;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #0056b3;
}

.error {
  color: #dc3545;
  margin-bottom: 1rem;
}
</style>