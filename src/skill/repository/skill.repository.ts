import { Skill } from '@prisma/client';
import { SkillCreateDto } from '../dto/skill.create.dto';
import { SkillEntity } from '../entities/skill.entity';

export abstract class SkillRepository {
  abstract create(data: SkillCreateDto): Promise<void>;
  abstract findBySkill(name: string): Promise<Skill | null>;
  abstract findSkillProgressByCharacter(characterId: string): Promise<any>;
  abstract updateSkillProgress(data: {
    id: string;
    level: number;
    experience: number;
    toNextLevel: number;
  }): Promise<void>;
  abstract findSkillById(id: string): Promise<SkillEntity | null>;
}
