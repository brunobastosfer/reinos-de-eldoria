import { Character } from 'src/character/entities/character.entity';
import { Booster } from './booster.entity';

export class CharacterBooster {
  id: string;
  characterId: string;
  boosterId: string;
  booster: Booster;
  character: Character;
}
