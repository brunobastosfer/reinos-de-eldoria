import { Module } from '@nestjs/common';
import { MonsterController } from './monster.controller';
import { MonsterService } from './monster.service';
import { MonsterRepository } from './repository/monster.repository';
import { MonsterPrismaRepository } from './repository/prisma/monster.prisma.repository';
import { DropModule } from 'src/drop/drop.module';
import { CharacterModule } from 'src/character/character.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [DropModule, CharacterModule],
  controllers: [MonsterController],
  providers: [
    MonsterService,
    { provide: MonsterRepository, useClass: MonsterPrismaRepository },
    PrismaService,
  ],
})
export class MonsterModule {}
