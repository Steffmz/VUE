<template>
  <div id="app" :class="{ 'dark-mode': darkMode }">
    <UserNotification v-if="notification.visible" :message="notification.message" :type="notification.type" />
    <button class="theme-toggle" @click="toggleDarkMode">
      <span v-if="darkMode">🌞</span>
      <span v-else>🌙</span>
    </button>
    <transition name="fade">
      <LoginRegister v-if="!loggedIn" @login-success="handleLogin" />
      <Dashboard v-else @logout="handleLogout" />
    </transition>
  </div>
</template>

<script>
import LoginRegister from './components/LoginRegister.vue';
import Dashboard from './components/Dashboard.vue';
import UserNotification from './components/UserNotification.vue';

export default {
  data() {
    return {
      loggedIn: localStorage.getItem('loggedIn') === 'true',
      darkMode: localStorage.getItem('darkMode') === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches,
      notification: {
        visible: false,
        message: '',
        type: 'info',
      },
    };
  },
  components: {
    LoginRegister,
    Dashboard,
    UserNotification,
  },
  methods: {
    handleLogin() {
      this.loggedIn = true;
      localStorage.setItem('loggedIn', 'true');
    },
    handleLogout() {
      this.loggedIn = false;
      localStorage.removeItem('loggedIn');
      this.showNotification('Sesión cerrada correctamente', 'info');
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('darkMode', this.darkMode);
    },
    showNotification(message, type = 'info') {
      this.notification = { visible: true, message, type };
      setTimeout(() => {
        this.notification.visible = false;
      }, 3000);
    },
  },
};
</script>

<style>
/* Estilos globales */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
  color: #333;
  transition: background-color 0.5s ease, color 0.5s ease;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Tema oscuro */
body.dark-mode {
  background-color: #181818;
  color: #e0e0e0;
}

.dark-mode .auth-container {
  background: #242424;
  color: #e0e0e0;
}

.dark-mode .switch-buttons button {
  background: #333;
  color: #e0e0e0;
}

.dark-mode .switch-buttons button.active {
  background: #1e90ff;
  color: #fff;
}

.dark-mode .btn {
  background: #1e90ff;
  color: #fff;
}

.dark-mode .btn:hover {
  background: #1c86ee;
}

/* Botón de alternar tema */
.theme-toggle {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #e0e0e0;
  transition: color 0.3s;
}

.theme-toggle:hover {
  color: #1e90ff;
}

/* Contenedor de autenticación */
.auth-container {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

/* Botones de cambio de vista */
.switch-buttons {
  margin-top: 1rem;
}

.switch-buttons button {
  background: #e0e0e0;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.switch-buttons button.active {
  background: #007bff;
  color: #fff;
}

.switch-buttons button:hover {
  background: #007bff;
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .auth-container {
    padding: 1rem;
    width: 90%;
  }

  .switch-buttons button {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .form-group input {
    font-size: 1rem;
  }

  .btn {
    font-size: 1rem;
    padding: 0.5rem;
  }
}
</style>