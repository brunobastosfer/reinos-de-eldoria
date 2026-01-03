import { IsString } from 'class-validator';

export class PremiumAccountDto {
  @IsString()
  accountId: string;

  @IsString()
  premiumId: string;
}
