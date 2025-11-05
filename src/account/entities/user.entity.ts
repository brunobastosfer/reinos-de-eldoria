import { Account } from './account.entity';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  nacionality: string;
  confirmed: boolean;
  account?: Account | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
