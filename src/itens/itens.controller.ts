import { Body, Controller, Post } from "@nestjs/common";
import { ItensCreateDto } from "./dto/itens.create.dto";
import { ItensService } from "./itens.service";

@Controller('monster')
export class ItensController {
    constructor(private readonly itemService: ItensService){}
    @Post('/create')
    create(@Body() data: ItensCreateDto): any {
const msg = this.itemService.create(data)
return msg
    }
}