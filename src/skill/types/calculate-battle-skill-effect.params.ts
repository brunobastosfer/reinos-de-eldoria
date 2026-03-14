import { CharacterBattleEntity } from '../../battle/entities/character-battle.entity';
import { MonsterBattleEntity } from '../../battle/entities/monster-battle.entity';

export type CalculateBattleSkillEffectParams = {
  skillId: string;
  caster: CharacterBattleEntity | MonsterBattleEntity;
  target: CharacterBattleEntity | MonsterBattleEntity;
};
