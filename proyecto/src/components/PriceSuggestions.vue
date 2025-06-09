<!-- filepath: c:\Users\wilso\Documents\VUE\proyecto\src\components\PriceSuggestions.vue -->
<template>
  <button @click="fetchSuggestions" :disabled="loading" class="btn">
    {{ loading ? 'Calculando precios…' : 'Obtener Sugerencias de Precio' }}
  </button>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['items']);
const emit = defineEmits(['suggestions']);
const loading = ref(false);

async function fetchSuggestions() {
  loading.value = true;
  try {
    // Simulación de llamada a API
    setTimeout(() => {
      emit('suggestions', { subtotal: 12345 });
      loading.value = false;
    }, 1500);
  } catch (err) {
    loading.value = false;
    alert('No se pudo obtener sugerencias');
  }
}
</script>