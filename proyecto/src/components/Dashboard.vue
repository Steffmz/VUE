<!-- filepath: c:\Users\wilso\Documents\VUE\proyecto\src\components\Dashboard.vue -->
<template>
  <div>
    <h2>Gestión de Cotizaciones</h2>
    <QuoteTable :items="items" />
    <PriceSuggestions :items="items" @suggestions="handleSuggestions" />
    <Subtotal v-if="suggestedSubtotal !== null" :subtotal="suggestedSubtotal" />
    <button class="btn btn-logout" @click="logout">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import QuoteTable from './QuoteTable.vue';
import PriceSuggestions from './PriceSuggestions.vue';
import Subtotal from './Subtotal.vue';

const emit = defineEmits(['logout']);
const items = ref([
  { id: 1, name: 'Producto A', quantity: 10 },
  { id: 2, name: 'Servicio B', quantity: 5 },
]);
const suggestedSubtotal = ref(null);

function handleSuggestions({ subtotal }) {
  suggestedSubtotal.value = subtotal;
}
function logout() {
  emit('logout');
}
</script>