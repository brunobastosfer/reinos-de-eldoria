import { ItemCreateDto } from "../dto/item.create.dto";

export abstract class ItemRepository {
abstract create(data: ItemCreateDto): any
abstract findByItem(Item: string): any
}
