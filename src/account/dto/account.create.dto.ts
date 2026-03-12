import { IsIn, IsString } from 'class-validator';

export class AccountCreateDto {
  @IsString()
  @IsIn(['FREE', 'PREMIUM'])
  accountType: 'FREE' | 'PREMIUM';

  @IsString()
  @IsIn(['BANISHED', 'SUSPEND', 'NORMAL'])
  accountStatus: 'BANISHED' | 'SUSPEND' | 'NORMAL';
}
