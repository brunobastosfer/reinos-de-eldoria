import { Injectable } from '@nestjs/common';
import { CreateBlacksmithDto } from './dto/create-blacksmith.dto';
import { UpdateBlacksmithDto } from './dto/update-blacksmith.dto';

@Injectable()
export class BlacksmithService {
  create(createBlacksmithDto: CreateBlacksmithDto) {
    return 'This action adds a new blacksmith';
  }

  findAll() {
    return `This action returns all blacksmith`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blacksmith`;
  }

  update(id: number, updateBlacksmithDto: UpdateBlacksmithDto) {
    return `This action updates a #${id} blacksmith`;
  }

  remove(id: number) {
    return `This action removes a #${id} blacksmith`;
  }
}
