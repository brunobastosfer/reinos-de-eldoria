import { Injectable } from "@nestjs/common";
import { MonsterRepository } from "../monster.repository";
import { MonsterCreateDto } from "src/monster/dto/monster.create.dto";

@Injectable()
export class MonsterPrismaRepository implements MonsterRepository{
    create(data: MonsterCreateDto) {
        return true
    }
    findByMonster(monster: string) {
        return true
    }

}