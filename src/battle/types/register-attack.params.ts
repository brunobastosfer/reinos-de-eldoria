import { CharacterBattleEntity } from '../entities/character-battle.entity';
import { MonsterBattleEntity } from '../entities/monster-battle.entity';

export type RegisterAttackParams = {
  character: CharacterBattleEntity;
  monster: MonsterBattleEntity;
  hit: boolean;
};
