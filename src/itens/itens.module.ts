import { Module } from '@nestjs/common';
import { ItensController } from './itens.controller';
import { ItensService } from './itens.service';
import { ItensRepository } from './repository/itens.repository';
import { ItensPrismaRepository } from './repository/prisma/itens.prisma.repository';


@Module({
  imports: [],
  controllers: [ItensController],
  providers: [ItensService, {provide: ItensRepository, useClass: ItensPrismaRepository}],
})
export class ItensModule {}
