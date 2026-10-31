export type SlotType = 'helmet' | 'armor' | 'weapon' | 'boots';

export interface ItemStats {
  attack: number;
  defense: number;
  speed: number;
}

export interface EquipmentItem {
  id: string;
  name: string;
  type: SlotType;
  weight: number;
  stats: ItemStats;
  image?: string;
}

export interface CharacterBaseStats {
  attack: number;
  defense: number;
  speed: number;
  maxWeight: number;
}