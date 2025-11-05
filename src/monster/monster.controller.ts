import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Get()
  async findAll() {
    return await this.monsterService.findAll();
  }

  @Post('/defeat')
  async monsterDefeat(@Body() data: MonsterDefeatDto) {
    return await this.monsterService.monsterDefeat(data);
  }
}
