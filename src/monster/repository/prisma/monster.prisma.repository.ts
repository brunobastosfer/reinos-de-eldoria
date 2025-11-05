import { Injectable } from '@nestjs/common';
import { MonsterRepository } from '../monster.repository';
import { MonsterCreateDto } from 'src/monster/dto/monster.create.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Monster } from 'src/monster/entities/monster.entity';

@Injectable()
export class MonsterPrismaRepository implements MonsterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.monster.findUnique({
      where: {
        id,
      },
      include: {
        MonsterDrop: {
          include: {
            possibleItems: true,
          },
        },
        DropLog: true,
        skill: true,
      },
    });
  }

  async findByMonster(monster: string) {
    return await this.prisma.monster.findFirst({
      where: {
        name: monster,
      },
    });
  }

  async create(data: MonsterCreateDto): Promise<Monster> {
    return await this.prisma.monster.create({
      data: {
        damage: data.damage,
        defense: data.defense,
        experience: data.experience,
        lvl: data.lvl,
        name: data.name,
        description: data.description,
        life: data.life,
      },
    });
  }

  async findAll(): Promise<Monster[]> {
    return await this.prisma.monster.findMany({});
  }
}
