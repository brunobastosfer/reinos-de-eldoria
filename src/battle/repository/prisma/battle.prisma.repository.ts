import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BattleRepository } from '../battleRepository';

@Injectable()
export class BattlePrismaRepository implements BattleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findActive(characterId: string, monsterId: string) {
    return this.prisma.monsterBattle.findFirst({
      where: {
        characterId,
        monsterId,
        finishedAt: null,
      },
      select: {
        id: true,
        currentLife: true,
      },
    });
  }

  async create(data: {
    characterId: string;
    monsterId: string;
    currentLife: number;
  }) {
    return this.prisma.monsterBattle.create({
      data: {
        characterId: data.characterId,
        monsterId: data.monsterId,
        currentLife: data.currentLife,
      },
      select: {
        id: true,
        currentLife: true,
      },
    });
  }

  async updateLife(battleId: string, currentLife: number): Promise<void> {
    await this.prisma.monsterBattle.update({
      where: { id: battleId },
      data: { currentLife },
    });
  }

  async finishBattle(battleId: string): Promise<void> {
    await this.prisma.monsterBattle.update({
      where: { id: battleId },
      data: {
        finishedAt: new Date(),
      },
    });
  }
}
