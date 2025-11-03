import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from './repository/account.repository';
import { AccountPrismaRepository } from './prisma/account.prisma.repository';



@Module({
  imports: [],
  controllers: [AccountController],
  providers: [AccountService, {provide: AccountRepository, useClass: AccountPrismaRepository}],
})
export class AccountModule {}
