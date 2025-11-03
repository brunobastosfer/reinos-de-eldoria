import { Module } from '@nestjs/common';
import { MonsterController } from './monster.controller';
import { MonsterService } from './monster.service';
import { MonsterRepository } from './repository/monster.repository';
import { MonsterPrismaRepository } from './repository/prisma/monster.prisma.repository';


@Module({
  imports: [],
  controllers: [MonsterController],
  providers: [MonsterService, {provide: MonsterRepository, useClass: MonsterPrismaRepository}],
})
export class MonsterModule {}
