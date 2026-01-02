import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../item.repository';
import { ItemCreateDto } from 'src/item/dto/item.create.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from 'src/item/entities/item.entity';

@Injectable()
export class ItemPrismaRepository implements ItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ItemCreateDto): Promise<Item> {
    return await this.prisma.item.create({
      data: {
        name: data.name,
        description: data.description,
        attack: data.attack,
        defense: data.defense,
        rarity: data.rarity,
        vocation: data.vocation,
        itemType: data.type,
      },
    });
  }

  async findById(id: string): Promise<Item | null> {
    return await this.prisma.item.findUnique({
      where: {
        id,
      },
    });
  }

  async findByName(name: string): Promise<Item | null> {
    return await this.prisma.item.findFirst({
      where: {
        name,
      },
    });
  }

  async findAll(): Promise<Item[]> {
    return await this.prisma.item.findMany({});
  }

  async findTemplatesByTypeAndRarity(itemType: string, rarity: string) {
    return this.prisma.item.findMany({
      where: { itemType: itemType as any, rarity: rarity as any },
    });
  }
}
