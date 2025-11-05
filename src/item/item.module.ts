import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemRepository } from './repository/item.repository';
import { ItemPrismaRepository } from './repository/prisma/item.prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ItemController],
  providers: [
    ItemService,
    { provide: ItemRepository, useClass: ItemPrismaRepository },
    PrismaService,
  ],
})
export class ItemModule {}
