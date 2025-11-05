import { Injectable } from '@nestjs/common';
import { CreateMonsterDropDto } from './dto/create-monster-drop.dto';
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

  async findDropLogByCharacterId(id: string) {
    return await this.repository.findDropLogByCharacterId(id);
  }

  async findDropByMonsterId(id: string) {
    return await this.repository.findDropByMonsterId(id);
  }
}
