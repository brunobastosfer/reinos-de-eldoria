import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemRepository } from './repository/item.repository';
import { ItemPrismaRepository } from './repository/prisma/item.prisma.repository';


@Module({
  imports: [],
  controllers: [ItemController],
  providers: [ItemService, {provide: ItemRepository, useClass: ItemPrismaRepository}],
})
export class ItemModule {}
