<script setup lang="ts">
import { useEquipmentStore } from '../store/useEquipmentStore';
import type { EquipmentItem } from '../types';

const store = useEquipmentStore();

const getDiff = (item: EquipmentItem, statType: 'attack' | 'defense' | 'speed') => {
  const currentEquipped = store.equipped[item.type];
  const currentStat = currentEquipped ? currentEquipped.stats[statType] : 0;
  return item.stats[statType] - currentStat;
};

const formatDiff = (diff: number) => {
  if (diff > 0) return `+${diff}`;
  return diff.toString();
};
</script>

<template>
  <div class="inventory">
    <h3>Рюкзак</h3>
    <TransitionGroup name="list" tag="div" class="grid">
      <div 
        v-for="item in store.availableInventory" 
        :key="item.id" 
        class="inventory-item tooltip-container"
        @click="store.equipItem(item)"
      >
        <strong>{{ item.name }}</strong>
        <small>({{ item.type }}) | {{ item.weight }} кг</small>
        
        <!-- Hover Diff Tooltip -->
        <div class="tooltip">
          <div>Атака: <span :class="getDiff(item, 'attack') > 0 ? 'green' : (getDiff(item, 'attack') < 0 ? 'red' : '')">{{ formatDiff(getDiff(item, 'attack')) }}</span></div>
          <div>Захист: <span :class="getDiff(item, 'defense') > 0 ? 'green' : (getDiff(item, 'defense') < 0 ? 'red' : '')">{{ formatDiff(getDiff(item, 'defense')) }}</span></div>
          <div>Швидкість: <span :class="getDiff(item, 'speed') > 0 ? 'green' : (getDiff(item, 'speed') < 0 ? 'red' : '')">{{ formatDiff(getDiff(item, 'speed')) }}</span></div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.inventory { padding: 15px; background: #1a1a1a; border-radius: 8px; color: white; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
.inventory-item {
  padding: 10px; border: 1px solid #555; border-radius: 4px; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; position: relative;
  background: #2a2a2a;
}
.inventory-item:hover { background: #444; border-color: #888; }

.tooltip {
  visibility: hidden; width: 120px; background-color: #111; color: #fff;
  text-align: left; padding: 8px; border-radius: 6px; border: 1px solid #555;
  position: absolute; z-index: 1; bottom: 110%; left: 50%; transform: translateX(-50%);
  opacity: 0; transition: opacity 0.3s; font-size: 0.85em; pointer-events: none;
}
.tooltip-container:hover .tooltip { visibility: visible; opacity: 1; }
.green { color: #4CAF50; font-weight: bold; }
.red { color: #ff4c4c; font-weight: bold; }

.list-enter-active, .list-leave-active { transition: all 0.4s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateY(15px); }
.list-move { transition: transform 0.4s ease; }
</style>