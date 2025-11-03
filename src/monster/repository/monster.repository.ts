import { MonsterCreateDto } from "../dto/monster.create.dto";

export abstract class MonsterRepository {
abstract create(data: MonsterCreateDto): any
abstract findByMonster(monster: string): any
}
