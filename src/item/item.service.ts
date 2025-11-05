import { BadRequestException, Injectable } from '@nestjs/common';
import { ItemRepository } from './repository/item.repository';
import { ItemCreateDto } from './dto/item.create.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(private readonly repository: ItemRepository) {}

  async create(data: ItemCreateDto): Promise<Item> {
    const item = await this.repository.findByName(data.name);
    console.log(item);
    if (item) {
      throw new BadRequestException('Já existe um item com este nome');
    }
    return await this.repository.create(data);
  }

  async findAll(): Promise<Item[]> {
    return await this.repository.findAll();
  }
}
