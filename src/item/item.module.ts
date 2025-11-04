import { Module } from '@nestjs/common';
import { ItensController } from './item.controller';
import { ItensService } from './item.service';
import { ItensRepository } from './repository/item.repository';
import { ItensPrismaRepository } from './repository/prisma/item.prisma.repository';


@Module({
  imports: [],
  controllers: [ItensController],
  providers: [ItensService, {provide: ItensRepository, useClass: ItensPrismaRepository}],
})
export class ItensModule {}
