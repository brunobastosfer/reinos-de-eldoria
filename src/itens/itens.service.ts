import { Injectable } from "@nestjs/common";
import { ItensCreateDto } from "./dto/itens.create.dto";
import { ItensRepository } from "./repository/itens.repository";

@Injectable()
export class ItensService {
    constructor(private readonly repository: ItensRepository){}
create(data: ItensCreateDto): any {
    const item = this.repository.findByItem(data.name)
    console.log (item)
    if(item){
       return 'Já existe um item com esse nome.'
    }
this.repository.create(data)
return 'Item criado com sucesso.'
}
}