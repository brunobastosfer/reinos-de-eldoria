import { AccountCreateDto } from '../dto/account.create.dto';
import { UserCreateDto } from '../dto/user.create.dto';
import { Account } from '../entities/account.entity';
import { User } from '../entities/user.entity';

export abstract class AccountRepository {
  abstract create(data: UserCreateDto): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract confirm(id: string): Promise<void>;
  abstract findAll(): Promise<User[]>;
  abstract createAccount(data: AccountCreateDto): Promise<Account>;
  abstract findAccountById(id: string): Promise<Account | null>;
}
