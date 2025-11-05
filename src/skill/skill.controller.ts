import { Body, Controller, Post } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillCreateDto } from './dto/skill.create.dto';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}
  @Post('/create')
  create(@Body() data: SkillCreateDto): any {
    const msg = this.skillService.create(data);
    return msg;
  }
}
