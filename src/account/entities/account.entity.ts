import { AccountType, AccountStatus } from '@prisma/client';

export class Account {
  id: string;
  accountStatus: AccountStatus;
  accountType: AccountType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
