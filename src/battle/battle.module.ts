import { Module } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { CharacterModule } from 'src/character/character.module';
import { MonsterModule } from 'src/monster/monster.module';
import { CharacterEquipmentModule } from 'src/character/character-equipment.module';
import { BattleRepository } from './repository/battleRepository';
import { BattlePrismaRepository } from './repository/prisma/battle.prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { SkillModule } from 'src/skill/skill.module';

@Module({
  imports: [
    CharacterModule, 
    MonsterModule,
    CharacterEquipmentModule,
    SkillModule
  ],
  controllers: [BattleController],
  providers: [BattleService,
    { provide: BattleRepository, useClass: BattlePrismaRepository },
    PrismaService
  ],
  exports: [BattleService]
})
export class BattleModule {}
