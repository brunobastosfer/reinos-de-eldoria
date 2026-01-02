import { Inventario } from 'src/inventory/entities/inventory.entity';
import { CharacterBooster } from '../../booster/entities/character-booster.entity';
import { Progress } from './characterProgress.entity';
import { Classe } from 'src/classe/entities/class.entity';
import { SkillCharacterProgress } from '@prisma/client';

export class Character {
  id: string;
  mana: number;
  life: number;
  damage: number;
  nickname: string;
  nivelAttribute: number;
  defense: number;
  magic: number;
  stamina: number;
  lvl: number;
  accountId: string;
  classeId: string;
  boosters?: CharacterBooster[];
  progress?: Progress | null;
  invetory?: Inventario | null;
  classe?: Classe;
  skillProgress?: SkillCharacterProgress | null;
}
