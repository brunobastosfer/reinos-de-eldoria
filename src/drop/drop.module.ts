import { Module } from '@nestjs/common';
import { DropService } from './drop.service';
import { DropController } from './drop.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DropRepository } from './repository/drop.repository';
import { DropPrismaRepository } from './repository/prisma/drop.prisma.repository';

@Module({
  controllers: [DropController],
  providers: [
    DropService,
    PrismaService,
    { provide: DropRepository, useClass: DropPrismaRepository },
  ],
  exports: [DropService],
})
export class DropModule {}
