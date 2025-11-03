import { Body, Controller, Post } from "@nestjs/common";
import { MonsterCreateDto } from "./dto/monster.create.dto";
import { MonsterService } from "./monster.service";

@Controller('monster')
export class MonsterController {
    constructor(private readonly monsterService: MonsterService){}
    @Post('/create')
    create(@Body() data: MonsterCreateDto): any {
const msg = this.monsterService.create(data)
return msg
    }
}