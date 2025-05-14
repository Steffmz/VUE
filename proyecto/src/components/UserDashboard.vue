<template>
  <div>
    <h2>Bienvenido, {{ username }}</h2>
    <p>Este es tu dashboard.</p>
    <div class="task-manager">
      <h3>Mis Tareas</h3>
      <form @submit.prevent="addTask">
        <input type="text" v-model="newTask" placeholder="Nueva tarea" />
        <button type="submit" class="btn">Agregar</button>
      </form>
      <ul>
        <li v-for="(task, index) in tasks" :key="index">
          {{ task.name }}
          <button @click="completeTask(index)" class="btn btn-success">Completar</button>
          <button @click="removeTask(index)" class="btn btn-danger">Eliminar</button>
        </li>
      </ul>
    </div>
    <UserChart :tasks-per-day="tasksPerDay" />
    <button @click="logout" class="btn btn-logout">Cerrar Sesión</button>
  </div>
</template>

<script>
import UserChart from './UserChart.vue';

export default {
  name: 'UserDashboard',
  props: ['username'],
  components: {
    UserChart,
  },
  data() {
    return {
      tasks: [], // Cada tarea tendrá un nombre y un estado de completado
      newTask: '',
      tasksPerDay: JSON.parse(localStorage.getItem('tasksPerDay')) || [0, 0, 0, 0, 0, 0, 0], // Cargar desde localStorage
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ name: this.newTask.trim(), completed: false });
        this.newTask = '';
      }
    },
    completeTask(index) {
      const today = new Date().getDay(); // Obtener el día actual (0 = Domingo, 1 = Lunes, etc.)
      if (!this.tasks[index].completed) {
        this.tasks[index].completed = true;
        const dayIndex = today === 0 ? 6 : today - 1; // Ajustar el índice para que Domingo sea el último día
        this.tasksPerDay[dayIndex]++;
        localStorage.setItem('tasksPerDay', JSON.stringify(this.tasksPerDay)); // Guardar en localStorage
      }
    },
    removeTask(index) {
      const today = new Date().getDay();
      if (this.tasks[index].completed) {
        this.tasksPerDay[today === 0 ? 6 : today - 1]--;
        localStorage.setItem('tasksPerDay', JSON.stringify(this.tasksPerDay)); // Guardar en localStorage
      }
      this.tasks.splice(index, 1);
    },
    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style scoped>
.task-manager {
  margin-top: 1rem;
}

.task-manager ul {
  list-style: none;
  padding: 0;
}

.task-manager li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.btn-success {
  background: #28a745;
  color: #fff;
}

.btn-danger {
  background: #dc3545;
  color: #fff;
}

.btn-logout {
  margin-top: 1rem;
  background: #6c757d;
  color: #fff;
}
</style>