import { CharacterBooster } from '../../booster/entities/character-booster.entity';

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
  actualExperience: number;
  accountId: string;
  classeId: string;
  boosters?: CharacterBooster[];
}
