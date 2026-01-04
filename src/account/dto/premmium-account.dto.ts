import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PremiumAccountDto {
  @ApiProperty({
    example: 'uuid-da-conta',
    description: 'ID da conta do usuário',
  })
  @IsString()
  accountId: string;

  @ApiProperty({
    example: 'uuid-do-premium',
    description: 'ID do plano premium',
  })
  @IsString()
  premiumId: string;
}
