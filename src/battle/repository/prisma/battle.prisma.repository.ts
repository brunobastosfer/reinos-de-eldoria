import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BattleRepository } from '../battleRepository';

@Injectable()
export class BattlePrismaRepository implements BattleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findActiveByCharacter(characterId: string) {
    return this.prisma.monsterBattle.findFirst({
      where: {
        characterId,
        finishedAt: null,
      },
      select: {
        id: true,
        characterId: true,
        monsterId: true,
        characterCurrentLife: true,
        characterMaxLife: true,
        monsterCurrentLife: true,
        monsterMaxLife: true,
        fleeAttempted: true,
        fleeLocked: true,
      },
    });
  }

  async create(data: {
    characterId: string;
    monsterId: string;
    characterCurrentLife: number;
    characterMaxLife: number;
    monsterCurrentLife: number;
    monsterMaxLife: number;
  }) {
    return this.prisma.monsterBattle.create({
      data,
      select: {
        id: true,
        characterId: true,
        monsterId: true,
        characterCurrentLife: true,
        characterMaxLife: true,
        monsterCurrentLife: true,
        monsterMaxLife: true,
        fleeAttempted: true,
        fleeLocked: true,
      },
    });
  }

  async updateState(data: {
    battleId: string;
    characterCurrentLife?: number;
    monsterCurrentLife?: number;
    fleeAttempted?: boolean;
    fleeLocked?: boolean;
  }): Promise<void> {
    const { battleId, ...rest } = data;

    await this.prisma.monsterBattle.update({
      where: { id: battleId },
      data: rest,
    });
  }

  async finishBattle(data: {
    battleId: string;
    winner: 'CHARACTER' | 'MONSTER' | 'FLEE';
  }): Promise<void> {
    await this.prisma.monsterBattle.update({
      where: { id: data.battleId },
      data: {
        finishedAt: new Date(),
        winner: data.winner,
      },
    });
  }
}
