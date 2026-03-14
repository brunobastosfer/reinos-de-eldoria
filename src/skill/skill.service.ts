import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SkillRepository } from './repository/skill.repository';
import { SkillCreateDto } from './dto/skill.create.dto';
import { SkillEntity } from './entities/skill.entity';
import { CalculateBattleSkillEffectParams } from './types/calculate-battle-skill-effect.params';
import { RegisterAttackParams } from '../battle/types/register-attack.params';
import { SkillEffectResult } from './types/skill-effect-result.type';
import { Skill } from '@prisma/client';

@Injectable()
export class SkillService {
  constructor(
    private readonly repository: SkillRepository,
    private readonly prisma: PrismaService,
  ) {}

  async findSkillById(id: string): Promise<SkillEntity | null> {
    return await this.repository.findSkillById(id);
  }

  async registerAttack({ character, monster, hit }: RegisterAttackParams) {
    const skill = character.skillCharacterProgress ?? character.skillProgress;

    if (!skill) {
      return {
        leveledUp: false,
        previousLevel: 0,
        currentLevel: 0,
        experience: 0,
        toNextLevel: 0,
      };
    }

    const previousLevel = skill.level;

    const baseGain =
      (monster.lvl / Math.max(character.lvl, 1)) * (hit ? 1.2 : 0.4);

    const gain = Math.max(0.1, baseGain);

    let experience = skill.experience + gain;
    let level = skill.level;

    const xpToNext = (lvl: number) => 50 * lvl ** 1.5;

    while (experience >= xpToNext(level)) {
      experience -= xpToNext(level);
      level++;
    }

    await this.repository.updateSkillProgress({
      id: skill.id,
      level,
      experience,
      toNextLevel: xpToNext(level),
    });

    return {
      leveledUp: level > previousLevel,
      previousLevel,
      currentLevel: level,
      experience,
      toNextLevel: xpToNext(level),
    };
  }

  async calculateBattleSkillEffect(
    data: CalculateBattleSkillEffectParams,
  ): Promise<SkillEffectResult> {
    const skill = await this.findSkillById(data.skillId);

    if (!skill) {
      throw new BadRequestException('Habilidade não encontrada.');
    }

    const manaCost = Number(skill.mana ?? 0);
    const casterMana = Number(data.caster?.mana ?? 0);

    if (casterMana < manaCost) {
      throw new BadRequestException(
        'Mana insuficiente para usar esta habilidade.',
      );
    }

    if (skill.type === 'ATACK') {
      const hitChance = this.getSkillHitChance(data.caster, data.target);
      const hit = Math.random() < hitChance;

      if (!hit) {
        return {
          skill,
          type: skill.type,
          hit: false,
          damage: 0,
          heal: 0,
          manaCost,
          minDamage: 0,
          maxDamage: 0,
          minHeal: 0,
          maxHeal: 0,
        };
      }

      const { rawDamage, minDamage, maxDamage } = this.getSkillDamageRange(
        skill,
        data.caster,
        data.target,
      );

      const damage = this.random(minDamage, maxDamage);

      return {
        skill,
        type: skill.type,
        hit: true,
        damage,
        heal: 0,
        manaCost,
        rawDamage,
        minDamage,
        maxDamage,
        minHeal: 0,
        maxHeal: 0,
      };
    }

    if (skill.type === 'HEAL') {
      const { rawHeal, minHeal, maxHeal } = this.getSkillHealRange(
        skill,
        data.caster,
      );

      const heal = this.random(minHeal, maxHeal);

      return {
        skill,
        type: skill.type,
        hit: true,
        damage: 0,
        heal,
        manaCost,
        rawHeal,
        minHeal,
        maxHeal,
        minDamage: 0,
        maxDamage: 0,
      };
    }

    return {
      skill,
      type: 'DEFENSE',
      hit: true,
      damage: 0,
      heal: 0,
      manaCost,
      minDamage: 0,
      maxDamage: 0,
      minHeal: 0,
      maxHeal: 0,
    };
  }

  private getSkillHitChance(caster: any, target: any) {
    const hitChance =
      0.65 +
      Number(caster?.lvl ?? 0) * 0.01 -
      Number(target?.dodge ?? 0) * 0.02;

    return this.clamp(hitChance, 0.1, 0.95);
  }

  private getSkillDamageRange(skill: SkillEntity, caster: any, target: any) {
    const baseValue = Number(skill.value.value ?? 0);
    const skillScaling = Number(skill.skillScaling ?? 0);
    const casterLevel = Number(caster?.lvl ?? 0);
    const casterDamage = Number(caster?.damage ?? 0);
    const targetDefense = Number(target?.defense ?? 0);

    let rawDamage =
      baseValue +
      casterLevel * skillScaling +
      casterDamage * 0.2 -
      targetDefense;

    rawDamage = Math.max(rawDamage, 1);

    const minDamage = Math.max(Math.floor(rawDamage * 0.85), 1);
    const maxDamage = Math.max(Math.ceil(rawDamage * 1.15), 1);

    return {
      rawDamage,
      minDamage,
      maxDamage,
    };
  }

  async create(skill: SkillCreateDto) {
    return await this.repository.create(skill);
  }

  private getSkillHealRange(skill: SkillEntity, caster: any) {
    const baseValue = Number(skill.value.value ?? 0);
    const skillScaling = Number(skill.skillScaling ?? 0);
    const casterLevel = Number(caster?.lvl ?? 0);
    const casterMagic = Number(
      caster?.magic ?? caster?.magicDamage ?? caster?.magicPower ?? 0,
    );

    let rawHeal = baseValue + casterLevel * skillScaling + casterMagic * 0.15;

    rawHeal = Math.max(rawHeal, 1);

    const minHeal = Math.max(Math.floor(rawHeal * 0.9), 1);
    const maxHeal = Math.max(Math.ceil(rawHeal * 1.1), 1);

    return {
      rawHeal,
      minHeal,
      maxHeal,
    };
  }

  private clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  private random(min: number, max: number) {
    if (max <= min) return min;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
