import { Injectable } from "@nestjs/common";
import { AccountRepository } from "../repository/account.repository";
import { AccountCreateDto } from "../dto/account.create.dto";

@Injectable()
export class AccountPrismaRepository implements AccountRepository{
    create(data: AccountCreateDto) {
        return true
    }
    findByEmail(email: string) {
        return true
    }

}