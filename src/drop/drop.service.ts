import { Injectable } from '@nestjs/common';
import { CreateMonsterDropDto } from './dto/create-monster-drop.dto';
import { UpdateDropDto } from './dto/update-drop.dto';
import { DropRepository } from './repository/drop.repository';
import { CreateMonsterItemDropDto } from './dto/create-monster-item-drop.dto';
import { CreateDropLogDto } from './dto/create-drop-log.dto';

@Injectable()
export class DropService {
  constructor(private readonly repository: DropRepository) {}

  async createMonsterDrop(data: CreateMonsterDropDto) {
    return await this.repository.createMonsterDrop(data);
  }

  async createMonsterItemDrop(data: CreateMonsterItemDropDto) {
    return await this.repository.createMonsterDropItem(data);
  }

  async createDropLog(data: CreateDropLogDto) {
    return await this.repository.createDropLog(data);
  }

  findAll() {
    return `This action returns all drop`;
  }

  findOne(id: number) {
    return `This action returns a #${id} drop`;
  }

  update(id: number, updateDropDto: UpdateDropDto) {
    return `This action updates a #${id} drop`;
  }

  remove(id: number) {
    return `This action removes a #${id} drop`;
  }
}
