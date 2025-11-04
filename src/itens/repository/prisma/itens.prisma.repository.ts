import { Injectable } from "@nestjs/common";
import { ItensRepository } from "../itens.repository";
import { ItensCreateDto } from "src/itens/dto/itens.create.dto";

@Injectable()
export class ItensPrismaRepository implements ItensRepository{
    create(data: ItensCreateDto) {
        return true
    }
    findByItem(item: string) {
        return true
    }

}