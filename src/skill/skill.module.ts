import { Module } from '@nestjs/common';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { SkillRepository } from './repository/skill.repository';
import { SkillPrismaRepository } from './repository/prisma/skill.prisma.repository';


@Module({
  imports: [],
  controllers: [SkillController],
  providers: [SkillService, {provide: SkillRepository, useClass: SkillPrismaRepository}],
})
export class SkillModule {}
