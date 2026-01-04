import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CharacterRepository } from './repository/character.repository';
import { CharacterPrismaRepository } from './repository/prisma/character.prisma.repository';
import { AccountModule } from 'src/account/account.module';
import { ClasseModule } from 'src/classe/classe.module';
import { CharacterEquipmentModule } from './character-equipment.module';

@Module({
  imports: [AccountModule, ClasseModule, CharacterEquipmentModule],
  controllers: [CharacterController],
  providers: [
    CharacterService,
    { provide: CharacterRepository, useClass: CharacterPrismaRepository },
    PrismaService,
  ],
  exports: [CharacterService],
})
export class CharacterModule {}
