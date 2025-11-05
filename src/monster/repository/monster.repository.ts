import { MonsterCreateDto } from '../dto/monster.create.dto';
import { Monster } from '../entities/monster.entity';

export abstract class MonsterRepository {
  abstract create(data: MonsterCreateDto): Promise<Monster>;
  abstract findByMonster(monster: string): Promise<Monster | null>;
  abstract findById(id: string): Promise<Monster | null>;
}
