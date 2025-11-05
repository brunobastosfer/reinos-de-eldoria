import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemCreateDto } from './dto/item.create.dto';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('/create')
  async create(@Body() data: ItemCreateDto): Promise<Item> {
    return await this.itemService.create(data);
  }

  @Get('')
  async findAll(): Promise<Item[]> {
    return await this.itemService.findAll();
  }
}
