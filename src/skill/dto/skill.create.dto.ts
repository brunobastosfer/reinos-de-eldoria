import { IsInt, IsOptional, IsEnum } from 'class-validator';
import { skillType, SkillUtilityType, ClasseType } from '@prisma/client';

export class SkillCreateDto {
  name: string;

  description: string;

  @IsInt()
  attack: number;

  @IsInt()
  mana: number;

  @IsEnum(ClasseType)
  class: ClasseType;

  @IsOptional()
  @IsEnum(SkillUtilityType)
  utility?: SkillUtilityType;

  @IsEnum(skillType)
  type: skillType;
}
