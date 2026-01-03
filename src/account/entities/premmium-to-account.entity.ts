import { PremiumAccount } from './premmium-account.entity';

export class PremiumToAccount {
  id: string;
  activatedAt: Date;
  expiratedAt: Date;
  accountId: string;
  premiumId: string;
  premiumAccount: PremiumAccount;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
