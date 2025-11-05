import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DropService } from './drop.service';
import { CreateMonsterDropDto } from './dto/create-monster-drop.dto';
import { CreateMonsterItemDropDto } from './dto/create-monster-item-drop.dto';

@Controller('drop')
export class DropController {
  constructor(private readonly dropService: DropService) {}

  @Post('/create-monster-drop')
  createMonsterDrop(@Body() createMonsterDropDto: CreateMonsterDropDto) {
    return this.dropService.createMonsterDrop(createMonsterDropDto);
  }

  @Post('/create-monster-item-drop')
  createMonsterItemDrop(
    @Body() createMonsterItemDropDto: CreateMonsterItemDropDto,
  ) {
    return this.dropService.createMonsterItemDrop(createMonsterItemDropDto);
  }

  @Get()
  findAll() {
    return this.dropService.findAll();
  }

  @Get('/monster/:id')
  async findDropByMonsterId(@Param('id') id: string) {
    return await this.dropService.findDropByMonsterId(id);
  }

  @Get('/drop-log/character/:id')
  async findDropLogByCharacterId(@Param('id') id: string) {
    return await this.dropService.findDropLogByCharacterId(id);
  }
}
