import { Controller, Get, Post, Body } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly service: CharacterService) {}

  @Post('create')
  create(@Body() createCharacterDto: CreateCharacterDto) {
    console.log(createCharacterDto);
    return this.service.create(createCharacterDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
