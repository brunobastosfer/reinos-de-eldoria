import { Body, Controller, Post } from "@nestjs/common";
import { ItemCreateDto } from "./dto/item.create.dto";
import { ItemService } from "./item.service";

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService){}
    @Post('/create')
    create(@Body() data: ItemCreateDto): any {
const msg = this.itemService.create(data)
return msg
    }
}