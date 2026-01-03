import { Module } from '@nestjs/common';
import { MonsterController } from './monster.controller';
import { MonsterService } from './monster.service';
import { MonsterRepository } from './repository/monster.repository';
import { MonsterPrismaRepository } from './repository/prisma/monster.prisma.repository';
import { DropModule } from 'src/drop/drop.module';
import { CharacterModule } from 'src/character/character.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryModule } from 'src/inventory/inventory.module';

@Module({
  imports: [DropModule, CharacterModule, InventoryModule],
  controllers: [MonsterController],
  providers: [
    MonsterService,
    { provide: MonsterRepository, useClass: MonsterPrismaRepository },
    PrismaService,
  ],
  exports: [
    MonsterService
  ]
})
export class MonsterModule {}
