import { Injectable } from "@nestjs/common";
import { AccountCreateDto } from "./dto/account.create.dto";
import { AccountRepository } from "./repository/account.repository";

@Injectable()
export class AccountService {
    constructor(private readonly repository: AccountRepository){}
create(data: AccountCreateDto): any {
    const email = this.repository.findByEmail(data.email)
    if(email){
        return 'Já existe uma conta com este email.'
    }
this.repository.create(data)
}
}