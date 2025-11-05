import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DropService } from './drop.service';
import { UpdateDropDto } from './dto/update-drop.dto';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dropService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDropDto: UpdateDropDto) {
    return this.dropService.update(+id, updateDropDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dropService.remove(+id);
  }
}
