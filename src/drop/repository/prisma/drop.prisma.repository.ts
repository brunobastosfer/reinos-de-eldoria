import { Injectable } from '@nestjs/common';
import { DropRepository } from '../drop.repository';
import { MonsterDropItem } from 'src/drop/entities/monster-drop-item.entity';
import { MonsterDrop } from 'src/drop/entities/monster-drop.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMonsterDropDto } from 'src/drop/dto/create-monster-drop.dto';
import { CreateMonsterItemDropDto } from 'src/drop/dto/create-monster-item-drop.dto';
import { CreateDropLogDto } from 'src/drop/dto/create-drop-log.dto';
import { DropLog } from 'src/drop/entities/drop-log.entity';

@Injectable()
export class DropPrismaRepository implements DropRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMonsterDropByMonsterId(id: string): Promise<MonsterDrop | null> {
    return await this.prisma.monsterDrop.findUnique({
      where: {
        monsterId: id,
      },
      include: {
        possibleItems: true,
      },
    });
  }

  async findMonsterDropItemById(id: string): Promise<MonsterDropItem | null> {
    return await this.prisma.monsterDropItem.findUnique({
      where: {
        id,
      },
    });
  }

  async createMonsterDrop(
    createMonsterDropDto: CreateMonsterDropDto,
  ): Promise<MonsterDrop> {
    return await this.prisma.monsterDrop.create({
      data: {
        minGold: createMonsterDropDto.minGold,
        maxGold: createMonsterDropDto.maxGold,
        itemId: createMonsterDropDto.itemId,
        monsterId: createMonsterDropDto.monsterId,
      },
    });
  }

  async createMonsterDropItem(
    data: CreateMonsterItemDropDto,
  ): Promise<MonsterDropItem> {
    return await this.prisma.monsterDropItem.create({
      data: {
        rarity: data.rarity,
        baseChance: data.baseChance,
        monsterDropId: data.monsterDropId,
        itemId: data.itemId,
      },
    });
  }

  async createDropLog(data: CreateDropLogDto): Promise<DropLog> {
    return await this.prisma.dropLog.create({
      data: {
        goldDropped: data.goldDropped,
        luckApplied: data.luckApplied,
        playerId: data.playerId,
        characterId: data.characterId,
        itemId: data.itemId,
        monsterId: data.monsterId,
        itemsDropped: data.itemsDropped,
      },
    });
  }

  async findDropLogByCharacterId(id: string): Promise<DropLog[]> {
    return await this.prisma.dropLog.findMany({
      where: {
        characterId: id,
      },
    });
  }

  async findDropByMonsterId(id: string): Promise<MonsterDrop[]> {
    return await this.prisma.monsterDrop.findMany({
      where: {
        monsterId: id,
      },
      include: {
        possibleItems: true,
      },
    });
  }
}
