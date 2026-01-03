import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryRepository } from './repository/inventory.repository';
import { InventoryPrismaRepository } from './repository/prisma/inventory.prisma.repository';

@Module({
  controllers: [InventoryController],
  providers: [
    InventoryService,
    PrismaService,
    {
      provide: InventoryRepository,
      useClass: InventoryPrismaRepository,
    },
  ],
  exports: [InventoryService],
})
export class InventoryModule {}
