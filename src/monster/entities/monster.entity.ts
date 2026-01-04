import { DropLog } from 'src/drop/entities/drop-log.entity';
import { MonsterDrop } from 'src/drop/entities/monster-drop.entity';

export class Monster {
  id: string;
  name: string;
  description: string | null;
  lvl: number;
  life: number;
  defense: number;
  damage: number;
  experience: number;
  skill?: any;
  MonsterDrop?: MonsterDrop[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  dodge: number;
  DropLog?: DropLog[];
}
