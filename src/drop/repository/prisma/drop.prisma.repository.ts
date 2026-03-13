import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DropRepository } from '../drop.repository';
import { MonsterDrop, MonsterDropItem } from '@prisma/client';
import { CreateMonsterDropDto } from 'src/drop/dto/create-monster-drop.dto';
import { CreateMonsterItemDropDto } from 'src/drop/dto/create-monster-item-drop.dto';
import { DropLog } from 'src/drop/entities/drop-log.entity';
import { CreateDropLogDto } from 'src/drop/dto/create-drop-log.dto';

@Injectable()
export class DropPrismaRepository implements DropRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMonsterDropByMonsterId(id: string): Promise<MonsterDrop | null> {
    return this.prisma.monsterDrop.findFirst({
      where: { monsterId: id },
      include: { possibleItems: true },
    });
  }

  async findMonsterDropItemById(id: string): Promise<MonsterDropItem | null> {
    return this.prisma.monsterDropItem.findUnique({
      where: { id },
      include: {
        item: {
          select: {
            name: true,
            rarity: true,
          },
        },
        monsterDrop: true,
      },
    });
  }

  async createMonsterDrop(data: CreateMonsterDropDto): Promise<MonsterDrop> {
    return this.prisma.monsterDrop.create({ data });
  }

  async createMonsterDropItem(
    data: CreateMonsterItemDropDto,
  ): Promise<MonsterDropItem> {
    return this.prisma.monsterDropItem.create({ data });
  }

  async createDropLog(data: CreateDropLogDto): Promise<DropLog> {
    return this.prisma.dropLog.create({ data });
  }

  async findDropLogByCharacterId(id: string): Promise<DropLog[]> {
    return this.prisma.dropLog.findMany({ where: { characterId: id } });
  }

  async findDropByMonsterId(id: string): Promise<MonsterDrop[]> {
    return this.prisma.monsterDrop.findMany({ where: { monsterId: id } });
  }
}
