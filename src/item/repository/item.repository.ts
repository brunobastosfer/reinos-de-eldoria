import { ItensCreateDto } from "../dto/item.create.dto";

export abstract class ItensRepository {
abstract create(data: ItensCreateDto): any
abstract findByItem(Item: string): any
}
