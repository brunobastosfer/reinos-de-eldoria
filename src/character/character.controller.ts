import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly service: CharacterService) {}

  @Post('create')
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.service.create(createCharacterDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('/:id')
  async findEquipmentsByCharacter(
    @Param('id') id: string
  ){
    return await this.service.findEquipmentByCharacterId(id);
  }
}
