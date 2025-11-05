import { Injectable } from '@nestjs/common';
import { ClasseRepository } from '../classe.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClassDto } from 'src/classe/dto/create-class.dto';
import { Class } from 'src/classe/entities/class.entity';
import { ClasseType } from '@prisma/client';

@Injectable()
export class ClassePrismaRepository implements ClasseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateClassDto): Promise<Class> {
    return await this.prisma.classe.create({
      data: {
        manaBase: data.manaBase,
        lifeBase: data.lifeBase,
        damageBase: data.damageBase,
        defenseBase: data.defenseBase,
        type: data.type,
        attribute: data.attribute,
      },
    });
  }

  async findAll(): Promise<Class[]> {
    return await this.prisma.classe.findMany({});
  }

  async findByClassType(classType: ClasseType): Promise<Class | null> {
    return await this.prisma.classe.findFirst({
      where: {
        type: classType,
      },
    });
  }
}
