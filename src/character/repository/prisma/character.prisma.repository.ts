import { Injectable } from '@nestjs/common';
import { CharacterRepository } from '../character.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCharacterDto } from 'src/character/dto/create-character.dto';
import { Character } from 'src/character/entities/character.entity';
import { UpdateCharacterDto } from 'src/character/dto/update-character.dto';

@Injectable()
export class CharacterPrismaRepository implements CharacterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCharacterDto): Promise<Character> {
    const [character] = await this.prisma.$transaction(async (tx) => {
      const character = await tx.character.create({
        data: {
          mana: data.mana,
          life: data.life,
          damage: data.damage,
          nivelAttribute: data.nivelAttribute,
          defense: data.defense,
          magic: data.magic,
          stamina: 100,
          lvl: 1,
          accountId: data.accountId,
          classeId: data.classeId,
          nickname: data.nickname,
        },
      });

      await tx.characterProgress.create({
        data: {
          actualExperience: 0,
          toNextLvl: 40 * character.lvl ** 2,
          characterId: character.id,
        },
      });

      return [character];
    });

    return character;
  }

  async findByNickname(nickname: string): Promise<Character | null> {
    return await this.prisma.character.findFirst({
      where: {
        nickname,
      },
    });
  }

  async findAll(): Promise<Character[]> {
    return await this.prisma.character.findMany();
  }

  async findById(id: string): Promise<Character | null> {
    return await this.prisma.character.findUnique({
      where: {
        id,
      },
      include: {
        progress: true,
        boosters: {
          include: {
            booster: true,
            character: true,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateCharacterDto): Promise<void> {
    await this.prisma.character.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async incrementGold(id: string, gold: number): Promise<void> {
    await this.prisma.character.update({
      where: {
        id,
      },
      data: {
        gold: {
          increment: gold,
        },
      },
    });
  }

  async updateCharacterProgress(
    characterId: string,
    actualExperience: number,
  ): Promise<any> {
    return await this.prisma.characterProgress.update({
      where: {
        characterId,
      },
      data: {
        actualExperience,
      },
    });
  }

  async updateCharacterLvl(
    characterId: string,
    characterProgressId: string,
    lvl: number,
    actualExperience: number,
  ) {
    await this.prisma.$transaction(async (tx) => {
      await tx.character.update({
        where: {
          id: characterId,
        },
        data: {
          lvl: lvl,
        },
      });

      await tx.characterProgress.update({
        where: {
          id: characterProgressId,
        },
        data: {
          actualExperience,
          toNextLvl: 40 * lvl ** 2,
        },
      });
    });
  }
}
