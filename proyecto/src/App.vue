<template>
  <div id="app" :class="{ 'dark-mode': darkMode }">
    <UserNotification v-if="notification.visible" :message="notification.message" :type="notification.type" />
    <button class="theme-toggle" @click="toggleDarkMode">
      <span v-if="darkMode">🌞</span>
      <span v-else>🌙</span>
    </button>
    <transition name="fade">
      <div v-if="!loggedIn" class="auth-container">
        <UserRegister v-if="view === 'register'" @notify="showNotification" />
        <UserLogin v-if="view === 'login'" @login-success="handleLogin" @notify="showNotification" />
        <div class="switch-buttons">
          <button @click="view = 'register'" :class="{ active: view === 'register' }">Ir a Registro</button>
          <button @click="view = 'login'" :class="{ active: view === 'login' }">Ir a Iniciar Sesión</button>
        </div>
      </div>
      <UserDashboard v-else :username="username" @logout="handleLogout" @notify="showNotification" />
    </transition>
  </div>
</template>

<script>
import UserRegister from './components/UserRegister.vue';
import UserLogin from './components/UserLogin.vue';
import UserDashboard from './components/UserDashboard.vue';
import UserNotification from './components/UserNotification.vue'; // Actualizar la importación

export default {
  data() {
    return {
      view: 'register',
      loggedIn: localStorage.getItem('loggedIn') === 'true',
      username: localStorage.getItem('username') || '',
      darkMode: localStorage.getItem('darkMode') === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches,
      notification: {
        visible: false,
        message: '',
        type: 'info',
      },
    };
  },
  components: {
    UserRegister,
    UserLogin,
    UserDashboard,
    UserNotification, // Actualizar el nombre del componente
  },
  methods: {
    handleLogin(username) {
      this.loggedIn = true;
      this.username = username;
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', username);
      
      // Inicializar tasksPerDay si no existe
      if (!localStorage.getItem('tasksPerDay')) {
        localStorage.setItem('tasksPerDay', JSON.stringify([0, 0, 0, 0, 0, 0, 0]));
      }
    },
    handleLogout() {
      this.loggedIn = false;
      this.username = '';
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('username');
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
      }, 3000); // Ocultar la notificación después de 3 segundos
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