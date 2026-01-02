import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlacksmithService } from './blacksmith.service';
import { CreateBlacksmithDto } from './dto/create-blacksmith.dto';
import { UpdateBlacksmithDto } from './dto/update-blacksmith.dto';

@Controller('blacksmith')
export class BlacksmithController {
  constructor(private readonly blacksmithService: BlacksmithService) {}

  @Post()
  create(@Body() createBlacksmithDto: CreateBlacksmithDto) {
    return this.blacksmithService.create(createBlacksmithDto);
  }

  @Get()
  findAll() {
    return this.blacksmithService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blacksmithService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlacksmithDto: UpdateBlacksmithDto) {
    return this.blacksmithService.update(+id, updateBlacksmithDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blacksmithService.remove(+id);
  }
}
