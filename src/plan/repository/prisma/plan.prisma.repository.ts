import { CreatePlanDto } from 'src/plan/dto/create-plan.dto';
import { Plan } from 'src/plan/entities/plan.entity';
import { PlanRepository } from '../plan.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlanPrismaRepository implements PlanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePlanDto): Promise<Plan> {
    console.log(data);
    return await this.prisma.premiumAccount.create({
      data: {
        days: data.days,
        price: data.price,
      },
    });
  }

  async findAll(): Promise<Plan[]> {
    return await this.prisma.premiumAccount.findMany({});
  }

  async findById(id: string): Promise<Plan | null> {
    return await this.prisma.premiumAccount.findUnique({
      where: {
        id,
      },
    });
  }
}
