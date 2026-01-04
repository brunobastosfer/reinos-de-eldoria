import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SkillRepository } from '../skill.repository';
import { SkillCreateDto } from 'src/skill/dto/skill.create.dto';

@Injectable()
export class SkillPrismaRepository implements SkillRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: SkillCreateDto): Promise<void> {
    const classe = await this.prisma.classe.findFirst({
      where: { type: data.class },
    });

    if (!classe) {
      throw new Error('Classe não encontrada');
    }

    await this.prisma.skill.create({
      data: {
        name: data.name,
        description: data.description,
        mana: data.mana,
        type: data.type,
        utility: data.utility ?? null,
        value: {
          create: {
            value: data.attack,
          },
        },
        Classe: {
          connect: {
            id: classe.id,
          },
        },
      },
    });
  }

  async findBySkill(name: string) {
    return await this.prisma.skill.findFirst({
      where: { name },
    });
  }

  async findSkillProgressByCharacter(characterId: string) {
    return this.prisma.skillCharacterProgress.findUnique({
      where: { characterId },
    });
  }

  async updateSkillProgress(data: {
    id: string;
    level: number;
    experience: number;
    toNextLevel: number;
  }): Promise<void> {
    await this.prisma.skillCharacterProgress.update({
      where: { id: data.id },
      data: {
        level: data.level,
        experience: data.experience,
        toNextLevel: data.toNextLevel,
      },
    });
  }
}
