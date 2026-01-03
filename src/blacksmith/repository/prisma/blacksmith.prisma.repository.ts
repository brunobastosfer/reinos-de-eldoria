import { Injectable } from '@nestjs/common';
import { BlacksmithRepository } from '../blacksmith.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlacksmithPrismaRepository implements BlacksmithRepository {
  constructor(private prisma: PrismaService) {}

  async createRarityAttempt(data: {
    itemInstanceId: string;
    fromRarity: string;
    toRarity: string;
    success: boolean;
    usedStoneId?: string;
  }) {
    return this.prisma.blacksmithRarityAttempt.create({
      data: {
        itemInstanceId: data.itemInstanceId,
        fromRarity: data.fromRarity as any,
        toRarity: data.toRarity as any,
        success: data.success,
        usedStoneId: data.usedStoneId ?? null,
      },
    });
  }
}
