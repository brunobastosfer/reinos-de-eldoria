import { ItemRarity } from '@prisma/client';
import { MonsterDrop } from './monster-drop.entity';

export class MonsterDropItem {
  id: string;
  rarity: ItemRarity;
  baseChance: number;
  monsterDropId: string;
  itemId: string;
  monsterDrop?: MonsterDrop;
  minQuantity: number;
  maxQuantity: number;
}
