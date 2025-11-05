import { RarityType } from '@prisma/client';
import { MonsterDrop } from './monster-drop.entity';

export class MonsterDropItem {
  id: string;
  monsterDropId: string;
  itemId: string;
  rarity: RarityType;
  baseChance: number;
  monsterDrop?: MonsterDrop;
}
