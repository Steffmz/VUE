<!-- filepath: c:\Users\wilso\Documents\VUE\proyecto\src\components\Notification.vue -->
<template>
  <div v-if="visible" class="notification" :class="type">
    <p>{{ message }}</p>
    <button @click="closeNotification">✖</button>
  </div>
</template>

<script>
export default {
  name: 'UserNotification', // Cambiar el nombre del componente
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'info', // Puede ser 'info', 'success', 'error'
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    closeNotification() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}

.notification.info {
  background-color: #007bff;
}

.notification.success {
  background-color: #28a745;
}

.notification.error {
  background-color: #dc3545;
}

.notification button {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>