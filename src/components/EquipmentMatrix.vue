<script setup lang="ts">
import { useEquipmentStore } from '../store/useEquipmentStore';
import type { SlotType } from '../types';

const store = useEquipmentStore();
const slots: SlotType[] = ['helmet', 'armor', 'weapon', 'boots'];
</script>

<template>
  <div class="equipment-matrix">
    <div 
      v-for="slot in slots" 
      :key="slot" 
      class="slot" 
      @click="store.unequipItem(slot)"
      :title="store.equipped[slot] ? 'Клікніть, щоб зняти' : `Порожній слот: ${slot}`"
    >
      <div v-if="store.equipped[slot]" class="equipped-item">
        <strong>{{ store.equipped[slot]?.name }}</strong>
        <small>{{ store.equipped[slot]?.weight }} кг</small>
      </div>
      <div v-else class="placeholder">
        {{ slot }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.equipment-matrix {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  width: 200px;
  margin: 0 auto;
}
.slot {
  width: 100%; height: 80px; border: 2px dashed #666; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  background: #333; color: white; transition: 0.2s;
}
.slot:hover { border-color: #aaa; }
.equipped-item { display: flex; flex-direction: column; align-items: center; color: #4CAF50; }
.placeholder { opacity: 0.5; text-transform: capitalize; }
</style>