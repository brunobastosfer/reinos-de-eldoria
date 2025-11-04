import { AccountCreateDto } from '../dto/account.create.dto';
import { User } from '../entities/user.entity';

export abstract class AccountRepository {
  abstract create(data: AccountCreateDto): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract confirm(id: string): Promise<void>;
  abstract findAll(): Promise<User[]>;
}
