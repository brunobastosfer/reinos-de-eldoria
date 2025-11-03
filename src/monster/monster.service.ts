import { Injectable } from "@nestjs/common";
import { MonsterCreateDto } from "./dto/monster.create.dto";
import { MonsterRepository } from "./repository/monster.repository";

@Injectable()
export class MonsterService {
    constructor(private readonly repository: MonsterRepository){}
create(data: MonsterCreateDto): any {
    const monster = this.repository.findByMonster(data.name)
    if(monster){
       return 'Já existe um monstro com esse nome.'
    }
this.repository.create(data)
}
}