import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from './repository/account.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountPrismaRepository } from './repository/prisma/account.prisma.repository';
import { PlanModule } from 'src/plan/plan.module';

@Module({
  imports: [PlanModule],
  controllers: [AccountController],
  providers: [
    AccountService,
    { provide: AccountRepository, useClass: AccountPrismaRepository },
    PrismaService,
  ],
  exports: [AccountService],
})
export class AccountModule {}
