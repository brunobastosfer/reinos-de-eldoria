import { Injectable } from '@nestjs/common';
import { ClasseRepository } from '../classe.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClassDto } from 'src/classe/dto/create-class.dto';
import { Classe } from 'src/classe/entities/class.entity';
import { ClasseType } from '@prisma/client';

@Injectable()
export class ClassePrismaRepository implements ClasseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateClassDto): Promise<Classe> {
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

  async findAll(): Promise<Classe[]> {
    return await this.prisma.classe.findMany({});
  }

  async findByClassType(classType: ClasseType): Promise<Classe | null> {
    return await this.prisma.classe.findFirst({
      where: {
        type: classType,
      },
    });
  }

  async findOne(id: string): Promise<Classe | null> {
    return await this.prisma.classe.findFirst({
      where: {
        id
      }
    })
  }
}
