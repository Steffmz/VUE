<template>
  <div>
    <h2>Registro</h2>
    <form @submit.prevent="register" class="form">
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
      <div class="form-group">
        <label for="username">Usuario:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn">Registrar</button>
    </form>
  </div>
</template>

<script>
import { registerUser } from '../services/authService';

export default {
  name: 'UserRegister',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    register() {
      try {
        registerUser(this.username, this.password);
        this.$emit('notify', 'Usuario registrado con éxito', 'success');
        this.username = '';
        this.password = '';
      } catch (error) {
        this.$emit('notify', error.message, 'error');
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: #dc3545;
  margin-bottom: 1rem;
}

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

.success {
  color: #28a745;
  margin-bottom: 1rem;
}
</style>