// src/character/character-equipment.module.ts
import { Module } from '@nestjs/common';
import { CharacterEquipmentService } from './character-equipment.service';
import { CharacterStatsService } from './character-stats.service';
import { CharacterRepository } from './repository/character.repository';

import { CharacterEquipmentPrismaRepository } from './repository/prisma/character-equipment.prisma.repository';
import { CharacterPrismaRepository } from './repository/prisma/character.prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CharacterEquipmentRepository } from './repository/character-equipment.repository ';

@Module({
  providers: [
    CharacterEquipmentService,
    CharacterStatsService,

    // repositories
    { provide: CharacterEquipmentRepository, useClass: CharacterEquipmentPrismaRepository },
    { provide: CharacterRepository, useClass: CharacterPrismaRepository },

    PrismaService,
  ],
  exports: [
    CharacterEquipmentService,
    CharacterStatsService,    
  ],
})
export class CharacterEquipmentModule {}
