import { PremiumToAccount } from 'src/account/entities/premmium-to-account.entity';

export class Plan {
  id: string;
  days: number;
  price: number;
  account?: PremiumToAccount[];
}
