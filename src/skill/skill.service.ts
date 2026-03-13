import { Injectable } from '@nestjs/common';
import { SkillRepository } from './repository/skill.repository';
import { SkillCreateDto } from './dto/skill.create.dto';

@Injectable()
export class SkillService {
  constructor(private readonly repository: SkillRepository) {}

  async create(data: SkillCreateDto) {
    const skill = await this.repository.findBySkill(data.name);
    console.log(skill);
    if (skill) {
      return 'Já existe uma skill com esse nome.';
    }
    await this.repository.create(data);
    return 'Skill criada com sucesso.';
  }

  async registerAttack({
    character,
    monster,
    hit,
  }: {
    character: any;
    monster: any;
    hit: boolean;
  }) {
    const skill = character.skillCharacterProgress;
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
}
