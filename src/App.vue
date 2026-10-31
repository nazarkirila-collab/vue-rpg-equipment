<script setup lang="ts">
import CharacterStatsWidget from './components/CharacterStatsWidget.vue';
import EquipmentMatrix from './components/EquipmentMatrix.vue';
import InventoryGrid from './components/InventoryGrid.vue';
</script>

<template>
  <div class="rpg-builder">
    <h1 class="title">Тактичний Конструктор Спорядження</h1>
    <div class="layout">
      <CharacterStatsWidget class="panel" />
      <EquipmentMatrix class="panel matrix" />
      <InventoryGrid class="panel inventory-panel" />
    </div>
  </div>
</template>

<style scoped>
.rpg-builder { max-width: 1000px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
.title { text-align: center; color: #fff; }
.layout { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; align-items: flex-start; }
.panel { flex: 1; min-width: 250px; }
.matrix { flex: 0 0 250px; }
.inventory-panel { flex: 2; min-width: 300px; }
:global(body) { background-color: #121212; margin: 0; padding: 20px; }
</style>