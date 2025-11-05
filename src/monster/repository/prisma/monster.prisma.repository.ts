import { Injectable } from '@nestjs/common';
import { MonsterRepository } from '../monster.repository';
import { MonsterCreateDto } from 'src/monster/dto/monster.create.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MonsterPrismaRepository implements MonsterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.monster.findUnique({
      where: {
        id,
      },
      include: {
        MonsterDrop: true,
        DropLog: true,
        skill: true,
      },
    });
  }

  create(data: MonsterCreateDto) {
    return true;
  }

  findByMonster(monster: string) {
    return true;
  }
}
