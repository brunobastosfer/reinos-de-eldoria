import { Body, Controller, Post } from '@nestjs/common';
import { MonsterCreateDto } from './dto/monster.create.dto';
import { MonsterService } from './monster.service';
import { MonsterDefeatDto } from './dto/monster-defeat.dto';

@Controller('monster')
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}
  @Post('/create')
  create(@Body() data: MonsterCreateDto): any {
    return this.monsterService.create(data);
  }

  @Post('/defeat')
  monsterDefeat(@Body() data: MonsterDefeatDto) {}
}
