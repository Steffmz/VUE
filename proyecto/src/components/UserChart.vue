<script setup>
import { ref, watch } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
// eslint-disable-next-line no-undef
const props = defineProps({
  tasksPerDay: {
    type: Array,
    required: true,
    default: () => [0, 0, 0, 0, 0, 0, 0], // Asegurar que sea un array con 7 elementos
  },
});

const chartData = ref({
  labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  datasets: [
    {
      label: 'Tareas completadas',
      backgroundColor: '#4CAF50',
      data: props.tasksPerDay,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
});

// Actualiza chartData cuando cambian las tareas
watch(
  () => props.tasksPerDay,
  (newTasks) => {
    chartData.value.datasets[0].data = newTasks; // Actualizar los datos del gráfico
  },
  { immediate: true }
);
</script>

<template>
  <!-- Solo muestra el gráfico si hay datos -->
  <Bar v-if="chartData.datasets[0].data.length > 0" :data="chartData" :options="chartOptions" />
  <div v-else>No hay tareas para mostrar aún.</div>
</template>
