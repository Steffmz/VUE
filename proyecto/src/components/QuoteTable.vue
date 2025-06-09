<!-- filepath: c:\Users\wilso\Documents\VUE\proyecto\src\components\QuoteTable.vue -->
<template>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Cantidad</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.quantity }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps(['items']);
</script>