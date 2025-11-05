import { Module } from '@nestjs/common';
import { ClasseController } from './classe.controller';
import { ClasseService } from './classe.service';
import { ClasseRepository } from './repository/classe.repository';
import { ClassePrismaRepository } from './repository/prisma/classe.prisma.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ClasseController],
  providers: [
    ClasseService,
    { provide: ClasseRepository, useClass: ClassePrismaRepository },
    PrismaService,
  ],
})
export class ClasseModule {}
