<script setup lang="ts">
import { useEquipmentStore } from '../store/useEquipmentStore';
import { storeToRefs } from 'pinia';

const store = useEquipmentStore();
const { baseStats, totalStats, bonusStats, currentWeight, isOverloaded } = storeToRefs(store);

const formatStat = (base: number, bonus: number, total: number) => {
  const sign = bonus >= 0 ? '+' : '';
  return `${base} (${sign}${bonus}) = ${total}`;
};
</script>

<template>
  <div class="stats-widget">
    <h2>Характеристики Героя</h2>
    <div v-if="isOverloaded" class="overload-warning">⚠️ ПЕРЕВАНТАЖЕНИЙ! Швидкість впала до 0.</div>
    
    <ul>
      <li>⚔️ Атака: {{ formatStat(baseStats.attack, bonusStats.attack, totalStats.attack) }}</li>
      <li>🛡️ Захист: {{ formatStat(baseStats.defense, bonusStats.defense, totalStats.defense) }}</li>
      <li>🏃 Швидкість: {{ formatStat(baseStats.speed, bonusStats.speed, totalStats.speed) }}</li>
    </ul>

    <div class="weight-indicator" :class="{ 'text-red': isOverloaded }">
      ⚖️ Вага: {{ currentWeight }} / {{ baseStats.maxWeight }} кг
    </div>

    <button class="reset-btn" @click="store.resetBuild()">Скинути білд</button>
  </div>
</template>

<style scoped>
.stats-widget { padding: 15px; border: 2px solid #444; border-radius: 8px; background: #222; color: #fff; }
.overload-warning { color: #ff4c4c; font-weight: bold; margin-bottom: 10px; }
.text-red { color: #ff4c4c; font-weight: bold; }
.reset-btn { margin-top: 15px; padding: 8px 12px; background: #ff4c4c; color: white; border: none; cursor: pointer; border-radius: 4px;}
.reset-btn:hover { background: #d43f3f; }
ul { list-style: none; padding: 0; }
li { margin: 5px 0; }
</style>