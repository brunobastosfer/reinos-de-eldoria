import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMonsterDropDto {
  @IsNumber()
  minGold: number;

  @IsNumber()
  maxGold: number;

  @IsString()
  @IsOptional()
  itemId?: string;

  @IsString()
  monsterId: string;
}
