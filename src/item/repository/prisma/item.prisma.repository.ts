import { Injectable } from "@nestjs/common";
import { ItemRepository } from "../item.repository";
import { ItemCreateDto } from "src/item/dto/item.create.dto";

@Injectable()
export class ItemPrismaRepository implements ItemRepository{
    create(data: ItemCreateDto) {
        return true
    }
    findByItem(item: string) {
        return true
    }

}