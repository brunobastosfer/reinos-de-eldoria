import { ItensCreateDto } from "../dto/itens.create.dto";

export abstract class ItensRepository {
abstract create(data: ItensCreateDto): any
abstract findByItem(Item: string): any
}
