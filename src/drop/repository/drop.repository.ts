import { CreateDropLogDto } from '../dto/create-drop-log.dto';
import { CreateMonsterDropDto } from '../dto/create-monster-drop.dto';
import { CreateMonsterItemDropDto } from '../dto/create-monster-item-drop.dto';
import { DropLog } from '../entities/drop-log.entity';
import { MonsterDropItem } from '../entities/monster-drop-item.entity';
import { MonsterDrop } from '../entities/monster-drop.entity';

export abstract class DropRepository {
  abstract findMonsterDropByMonsterId(id: string): Promise<MonsterDrop | null>;
  abstract findMonsterDropItemById(id: string): Promise<MonsterDropItem | null>;
  abstract createMonsterDrop(data: CreateMonsterDropDto): Promise<MonsterDrop>;
  abstract createMonsterDropItem(
    data: CreateMonsterItemDropDto,
  ): Promise<MonsterDropItem>;
  abstract createDropLog(data: CreateDropLogDto): Promise<DropLog>;
}
