import { CharacterBooster } from '../../booster/entities/character-booster.entity';
import { Progress } from './characterProgress.entity';

export class Character {
  id: string;
  mana: number;
  life: number;
  damage: number;
  nivelAttribute: number;
  defense: number;
  magic: number;
  stamina: number;
  lvl: number;
  accountId: string;
  classeId: string;
  boosters?: CharacterBooster[];
  progress?: Progress | null;
}
