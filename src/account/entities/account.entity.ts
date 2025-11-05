import { AccountType, AccountStatus } from '@prisma/client';
import { Character } from 'src/character/entities/character.entity';

export class Account {
  id: string;
  accountStatus: AccountStatus;
  accountType: AccountType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  characters?: Character[];
}
