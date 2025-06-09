<!-- filepath: c:\Users\wilso\Documents\VUE\proyecto\src\components\LoginRegister.vue -->
<template>
  <div class="auth-container">
    <div class="switch-buttons">
      <button @click="isRegistering = false" :class="{ active: !isRegistering }">Iniciar sesión</button>
      <button @click="isRegistering = true" :class="{ active: isRegistering }">Registrarse</button>
    </div>
    <form v-if="!isRegistering" @submit.prevent="login" class="form">
      <div class="form-group">
        <label>Usuario</label>
        <input v-model="loginUser" required />
      </div>
      <div class="form-group">
        <label>Contraseña</label>
        <input type="password" v-model="loginPass" required />
      </div>
      <button class="btn" type="submit">Iniciar sesión</button>
    </form>
    <form v-else @submit.prevent="register" class="form">
      <div class="form-group">
        <label>Usuario</label>
        <input v-model="registerUser" required />
      </div>
      <div class="form-group">
        <label>Contraseña</label>
        <input type="password" v-model="registerPass" required />
      </div>
      <button class="btn" type="submit">Registrarse</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['login-success']);
const isRegistering = ref(false);
const loginUser = ref('');
const loginPass = ref('');
const registerUser = ref('');
const registerPass = ref('');
const error = ref('');

function login() {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.user === loginUser.value && u.pass === loginPass.value);
  if (user) {
    emit('login-success', { user: loginUser.value });
    error.value = '';
  } else {
    error.value = 'Usuario o contraseña incorrectos';
  }
}

function register() {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(u => u.user === registerUser.value)) {
    error.value = 'El usuario ya existe';
    return;
  }
  users.push({ user: registerUser.value, pass: registerPass.value });
  localStorage.setItem('users', JSON.stringify(users));
  isRegistering.value = false;
  error.value = '';
}
</script>

<style scoped>
.error { color: #dc3545; margin-top: 1rem; }
</style>