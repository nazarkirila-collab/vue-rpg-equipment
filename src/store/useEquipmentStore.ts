import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { EquipmentItem, SlotType, CharacterBaseStats } from '../types';

// Мокові дані для інвентарю
const MOCK_INVENTORY: EquipmentItem[] = [
  { id: '1', name: 'Сталевий Шолом', type: 'helmet', weight: 5, stats: { attack: 0, defense: 15, speed: -2 } },
  { id: '2', name: 'Шкіряна Куртка', type: 'armor', weight: 8, stats: { attack: 2, defense: 10, speed: 5 } },
  { id: '3', name: 'Важка Броня', type: 'armor', weight: 25, stats: { attack: 0, defense: 40, speed: -15 } },
  { id: '4', name: 'Меч Героя', type: 'weapon', weight: 6, stats: { attack: 25, defense: 5, speed: 2 } },
  { id: '5', name: 'Важка Сокира', type: 'weapon', weight: 15, stats: { attack: 40, defense: 0, speed: -10 } },
  { id: '6', name: 'Легкі Чоботи', type: 'boots', weight: 2, stats: { attack: 0, defense: 5, speed: 10 } },
];

export const useEquipmentStore = defineStore('equipment', () => {
  // --- STATE ---
  const baseStats = ref<CharacterBaseStats>({ attack: 10, defense: 10, speed: 20, maxWeight: 40 });
  const inventory = ref<EquipmentItem[]>(MOCK_INVENTORY);
  const equipped = ref<Record<SlotType, EquipmentItem | null>>({
    helmet: null,
    armor: null,
    weapon: null,
    boots: null,
  });

  // Ініціалізація з localStorage
  const savedState = localStorage.getItem('rpg-equipment-build');
  if (savedState) {
    equipped.value = JSON.parse(savedState);
  }

  // --- GETTERS ---
  const availableInventory = computed(() => {
    const equippedIds = Object.values(equipped.value).map(item => item?.id);
    return inventory.value.filter(item => !equippedIds.includes(item.id));
  });

  const currentWeight = computed(() => {
    return Object.values(equipped.value).reduce((sum, item) => sum + (item?.weight || 0), 0);
  });

  const isOverloaded = computed(() => currentWeight.value > baseStats.value.maxWeight);

  const bonusStats = computed(() => {
    const bonus = { attack: 0, defense: 0, speed: 0 };
    Object.values(equipped.value).forEach(item => {
      if (item) {
        bonus.attack += item.stats.attack;
        bonus.defense += item.stats.defense;
        bonus.speed += item.stats.speed;
      }
    });
    return bonus;
  });

  const totalStats = computed(() => {
    return {
      attack: baseStats.value.attack + bonusStats.value.attack,
      defense: baseStats.value.defense + bonusStats.value.defense,
      speed: isOverloaded.value ? 0 : baseStats.value.speed + bonusStats.value.speed,
    };
  });

  // --- ACTIONS ---
  const equipItem = (item: EquipmentItem) => {
    equipped.value[item.type] = item;
  };

  const unequipItem = (slot: SlotType) => {
    equipped.value[slot] = null;
  };

  const resetBuild = () => {
    equipped.value = { helmet: null, armor: null, weapon: null, boots: null };
  };

  // --- PERSISTENCE ---
  watch(equipped, (newState) => {
    localStorage.setItem('rpg-equipment-build', JSON.stringify(newState));
  }, { deep: true });

  return {
    baseStats,
    inventory,
    equipped,
    availableInventory,
    currentWeight,
    isOverloaded,
    bonusStats,
    totalStats,
    equipItem,
    unequipItem,
    resetBuild
  };
});