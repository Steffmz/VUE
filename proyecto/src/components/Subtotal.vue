<!-- filepath: c:\Users\wilso\Documents\VUE\proyecto\src\components\Subtotal.vue -->
<template>
  <div class="mt-4 text-right text-xl">
    <strong>Subtotal Sugerido:</strong>
    {{ subtotal }}
  </div>
</template>

<script setup>
defineProps(['subtotal']);
</script>