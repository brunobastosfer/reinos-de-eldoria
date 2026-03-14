import { SkillEntity } from '../../skill/entities/skill.entity';

export interface MonsterBattleEntity {
  id: string;
  name: string;
  lvl: number;
  life: number;
  damage: number;
  defense: number;
  dodge?: number;
  agility?: number;
  mana?: number;
  skill?: SkillEntity[];
}
