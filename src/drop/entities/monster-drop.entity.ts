import { MonsterDropItem } from './monster-drop-item.entity';

export class MonsterDrop {
  id: string;
  monsterId: string;
  minGold: number;
  maxGold: number;
  itemId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  possibleItems?: MonsterDropItem[];
}
