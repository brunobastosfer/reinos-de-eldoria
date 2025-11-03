import { AccountCreateDto } from "../dto/account.create.dto";

export abstract class AccountRepository {
abstract create(data: AccountCreateDto): any
abstract findByEmail(email: string): any
}
