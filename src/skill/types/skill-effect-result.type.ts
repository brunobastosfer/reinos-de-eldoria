import { SkillEntity } from '../entities/skill.entity';

export type SkillEffectResult = {
  skill: SkillEntity;
  type: 'ATACK' | 'DEFENSE' | 'HEAL';
  hit: boolean;
  damage: number;
  heal: number;
  manaCost: number;
  rawDamage?: number;
  rawHeal?: number;
  minDamage?: number;
  maxDamage?: number;
  minHeal?: number;
  maxHeal?: number;
};
