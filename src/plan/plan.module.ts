import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlanRepository } from './repository/plan.repository';
import { PlanPrismaRepository } from './repository/prisma/plan.prisma.repository';

@Module({
  controllers: [PlanController],
  providers: [
    PlanService,
    PrismaService,
    {
      provide: PlanRepository,
      useClass: PlanPrismaRepository,
    },
  ],
  exports: [PlanService],
})
export class PlanModule {}
